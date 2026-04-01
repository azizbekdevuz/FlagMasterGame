/**
 * Statistics types and interfaces
 * Defines data structures for tracking game statistics
 */

export interface GameStatistics {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  bestStreak: number;
  averageAccuracy: number;
  totalCorrect: number;
  totalIncorrect: number;
  averageTimePerQuestion: number;
  gamesByMode: {
    classic: number;
    'time-attack': number;
    hardcore: number;
  };
  achievements: string[];
  lastPlayed: string | null;
}

export interface SessionStatistics {
  startTime: number;
  questions: QuestionStat[];
  totalTime: number;
  accuracy: number;
}

export interface QuestionStat {
  questionIndex: number;
  countryCode: string;
  correct: boolean;
  timeSpent: number; // milliseconds
  hintsUsed: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

