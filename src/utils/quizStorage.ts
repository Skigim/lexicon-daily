/**
 * Utility functions for tracking quiz completion state
 * Uses localStorage for anonymous users, syncs to Firestore for authenticated users
 */

import { saveQuizCompletion, getCompletedQuizzes as getFirestoreCompletions, syncLocalToFirestore } from '../services/firestoreService';

const STORAGE_KEY = 'lexicon_completed_quizzes';

/**
 * Get the set of completed word IDs from localStorage
 */
export function getLocalCompletedQuizzes(): Set<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ids = JSON.parse(stored) as number[];
      return new Set(ids);
    }
  } catch (e) {
    console.warn('Failed to read completed quizzes from localStorage:', e);
  }
  return new Set();
}

/**
 * Save completed quiz to localStorage
 */
function saveToLocalStorage(completed: Set<number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch (e) {
    console.warn('Failed to save completed quiz to localStorage:', e);
  }
}

/**
 * Mark a quiz as completed (localStorage + optionally Firestore)
 */
export async function markQuizCompleted(wordId: number, userId?: string | null): Promise<void> {
  // Always save to localStorage as backup
  const completed = getLocalCompletedQuizzes();
  completed.add(wordId);
  saveToLocalStorage(completed);

  // If user is signed in, also save to Firestore
  if (userId) {
    try {
      await saveQuizCompletion(userId, wordId);
    } catch (e) {
      console.warn('Failed to save to Firestore:', e);
    }
  }
}

/**
 * Check if a specific quiz is completed (local check for speed)
 */
export function isQuizCompleted(wordId: number): boolean {
  return getLocalCompletedQuizzes().has(wordId);
}

/**
 * Get all completed quizzes - merges local and cloud data
 */
export async function getAllCompletedQuizzes(userId?: string | null): Promise<Set<number>> {
  const localCompleted = getLocalCompletedQuizzes();
  
  if (!userId) {
    return localCompleted;
  }

  try {
    const cloudCompleted = await getFirestoreCompletions(userId);
    // Merge both sets
    return new Set([...localCompleted, ...cloudCompleted]);
  } catch (e) {
    console.warn('Failed to fetch from Firestore:', e);
    return localCompleted;
  }
}

/**
 * Sync local completions to cloud when user signs in
 */
export async function syncCompletionsToCloud(userId: string): Promise<void> {
  const localCompleted = getLocalCompletedQuizzes();
  if (localCompleted.size > 0) {
    try {
      await syncLocalToFirestore(userId, localCompleted);
    } catch (e) {
      console.warn('Failed to sync to Firestore:', e);
    }
  }
}

/**
 * Clear all local completion data
 */
export function clearLocalCompletedQuizzes(): void {
  localStorage.removeItem(STORAGE_KEY);
}
