/**
 * Firestore service for syncing user quiz completion data
 * 
 * Collection structure:
 * users/{userId}/completedQuizzes/{wordId}
 *   - wordId: number
 *   - completedAt: timestamp
 */

import { 
  doc, 
  setDoc, 
  getDocs, 
  collection,
  serverTimestamp,
  query
} from 'firebase/firestore';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const USERS_COLLECTION = 'users';
const COMPLETED_QUIZZES_SUBCOLLECTION = 'completedQuizzes';

/**
 * Mark a quiz as completed for a user in Firestore
 */
export async function saveQuizCompletion(userId: string, wordId: number): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId, COMPLETED_QUIZZES_SUBCOLLECTION, String(wordId));
  await setDoc(docRef, {
    wordId,
    completedAt: serverTimestamp(),
  });
}

/**
 * Get all completed quiz IDs for a user from Firestore
 */
export async function getCompletedQuizzes(userId: string): Promise<Set<number>> {
  const collectionRef = collection(db, USERS_COLLECTION, userId, COMPLETED_QUIZZES_SUBCOLLECTION);
  const q = query(collectionRef);
  const snapshot = await getDocs(q);
  
  const completedIds = new Set<number>();
  snapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = docSnapshot.data();
    if (data.wordId) {
      completedIds.add(data.wordId);
    }
  });
  
  return completedIds;
}

/**
 * Sync local storage completions to Firestore (for migration when user signs in)
 */
export async function syncLocalToFirestore(userId: string, localCompletedIds: Set<number>): Promise<void> {
  const promises = Array.from(localCompletedIds).map(wordId => 
    saveQuizCompletion(userId, wordId)
  );
  await Promise.all(promises);
}
