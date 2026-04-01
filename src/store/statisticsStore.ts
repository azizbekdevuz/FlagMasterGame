/**
 * Statistics store
 * Manages game statistics and achievements
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameStatistics, SessionStatistics, Achievement } from '@/lib/types/statistics';
import { STORAGE_KEYS } from '@/lib/config/constants';

interface StatisticsStore {
  statistics: GameStatistics;
  currentSession: SessionStatistics | null;
  
  // Actions
  startSession: () => void;
  recordQuestion: (stat: {
    questionIndex: number;
    countryCode: string;
    correct: boolean;
    timeSpent: number;
    hintsUsed: number;
  }) => void;
  endSession: (finalScore: number, mode: string) => void;
  checkAchievements: (score: number, streak: number, mode: string) => string[];
  resetStatistics: () => void;
}

const initialStatistics: GameStatistics = {
  totalGames: 0,
  totalScore: 0,
  bestScore: 0,
  bestStreak: 0,
  averageAccuracy: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  averageTimePerQuestion: 0,
  gamesByMode: {
    classic: 0,
    'time-attack': 0,
    hardcore: 0,
  },
  achievements: [],
  lastPlayed: null,
};

export const useStatisticsStore = create<StatisticsStore>()(
  persist(
    (set, get) => ({
      statistics: initialStatistics,
      currentSession: null,

      startSession: () => {
        set({
          currentSession: {
            startTime: Date.now(),
            questions: [],
            totalTime: 0,
            accuracy: 0,
          },
        });
      },

      recordQuestion: (stat) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const updatedQuestions = [...currentSession.questions, stat];
        const correctCount = updatedQuestions.filter((q) => q.correct).length;
        const accuracy = updatedQuestions.length > 0 
          ? (correctCount / updatedQuestions.length) * 100 
          : 0;

        set({
          currentSession: {
            ...currentSession,
            questions: updatedQuestions,
            accuracy,
          },
        });
      },

      endSession: (finalScore: number, mode: string) => {
        const { currentSession, statistics } = get();
        if (!currentSession) return;

        const totalTime = Date.now() - currentSession.startTime;
        const correctCount = currentSession.questions.filter((q) => q.correct).length;
        const incorrectCount = currentSession.questions.length - correctCount;
        const avgTimePerQuestion = currentSession.questions.length > 0
          ? totalTime / currentSession.questions.length
          : 0;

        const maxStreak = currentSession.questions.reduce((max, q, index) => {
          if (q.correct) {
            let currentStreak = 1;
            for (let i = index - 1; i >= 0 && currentSession.questions[i].correct; i--) {
              currentStreak++;
            }
            return Math.max(max, currentStreak);
          }
          return max;
        }, 0);

        const newTotalGames = statistics.totalGames + 1;
        const newTotalScore = statistics.totalScore + finalScore;
        const newTotalCorrect = statistics.totalCorrect + correctCount;
        const newTotalIncorrect = statistics.totalIncorrect + incorrectCount;
        const newAverageAccuracy = newTotalGames > 0
          ? ((statistics.averageAccuracy * statistics.totalGames + currentSession.accuracy) / newTotalGames)
          : currentSession.accuracy;

        const newAverageTimePerQuestion = newTotalGames > 0
          ? ((statistics.averageTimePerQuestion * statistics.totalGames + avgTimePerQuestion) / newTotalGames)
          : avgTimePerQuestion;

        const updatedStatistics: GameStatistics = {
          ...statistics,
          totalGames: newTotalGames,
          totalScore: newTotalScore,
          bestScore: Math.max(statistics.bestScore, finalScore),
          bestStreak: Math.max(statistics.bestStreak, maxStreak),
          averageAccuracy: newAverageAccuracy,
          totalCorrect: newTotalCorrect,
          totalIncorrect: newTotalIncorrect,
          averageTimePerQuestion: newAverageTimePerQuestion,
          gamesByMode: {
            ...statistics.gamesByMode,
            [mode]: (statistics.gamesByMode[mode as keyof typeof statistics.gamesByMode] || 0) + 1,
          },
          lastPlayed: new Date().toISOString(),
        };

        // Check for achievements
        const newAchievements = get().checkAchievements(finalScore, maxStreak, mode);
        if (newAchievements.length > 0) {
          updatedStatistics.achievements = [
            ...new Set([...updatedStatistics.achievements, ...newAchievements]),
          ];
        }

        set({
          statistics: updatedStatistics,
          currentSession: null,
        });
      },

      checkAchievements: (score: number, streak: number, mode: string) => {
        const { statistics } = get();
        const newAchievements: string[] = [];

        // Score-based achievements
        if (score >= 1000 && !statistics.achievements.includes('score_1000')) {
          newAchievements.push('score_1000');
        } else if (score >= 500 && !statistics.achievements.includes('score_500')) {
          newAchievements.push('score_500');
        } else if (score >= 100 && !statistics.achievements.includes('score_100')) {
          newAchievements.push('score_100');
        }

        // Streak-based achievements
        if (streak >= 50 && !statistics.achievements.includes('streak_50')) {
          newAchievements.push('streak_50');
        } else if (streak >= 25 && !statistics.achievements.includes('streak_25')) {
          newAchievements.push('streak_25');
        } else if (streak >= 10 && !statistics.achievements.includes('streak_10')) {
          newAchievements.push('streak_10');
        } else if (streak >= 5 && !statistics.achievements.includes('streak_5')) {
          newAchievements.push('streak_5');
        }

        // Mode-specific achievements
        if (mode === 'hardcore' && !statistics.achievements.includes('hardcore_clear')) {
          newAchievements.push('hardcore_clear');
        }
        if (mode === 'time-attack' && score >= 30 && !statistics.achievements.includes('time_attack_30')) {
          newAchievements.push('time_attack_30');
        }

        // First game
        if (statistics.totalGames === 0 && !statistics.achievements.includes('first_win')) {
          newAchievements.push('first_win');
        }

        // Perfect game (100% accuracy)
        if (statistics.averageAccuracy === 100 && !statistics.achievements.includes('perfect_game')) {
          newAchievements.push('perfect_game');
        }

        return newAchievements;
      },

      resetStatistics: () => {
        set({
          statistics: initialStatistics,
          currentSession: null,
        });
      },
    }),
    {
      name: STORAGE_KEYS.STATS,
      partialize: (state) => ({ statistics: state.statistics }),
    }
  )
);

