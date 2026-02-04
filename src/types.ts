// Define your data shapes here to ensure consistency across the app.

export interface QuizData {
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface WordData {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  example: string;
  etymology: string;
  quiz: QuizData;
}
