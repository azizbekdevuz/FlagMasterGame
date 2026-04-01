/**
 * Game store with enhanced features
 * Manages game state, difficulty progression, and integrates with statistics
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { countries } from '@/data/countries';
import { Country, GameMode, GameState } from '@/lib/types';
import { shuffleArray, getRandomItems } from '@/lib/utils';
import { GAME_CONFIG, DIFFICULTY_CONFIG, STORAGE_KEYS } from '@/lib/config/constants';
import { useStatisticsStore } from './statisticsStore';

interface GameStore extends GameState {
  // Config
  mode: GameMode;
  highScore: number;
  streak: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  hintsUsed: number;
  questionStartTime: number;
  
  // Current Round Data
  targetCountry: Country | null;
  options: Country[];
  usedCountries: Set<string>; // Track used countries to avoid repeats
  
  // Actions
  startGame: (mode: GameMode) => void;
  submitAnswer: (answer: Country) => boolean;
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  tickTimer: () => void;
  useHint: () => string | null;
  calculateDifficulty: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      status: 'idle',
      score: 0,
      mistakes: 0,
      currentQuestionIndex: 0,
      timeLeft: undefined,
      mode: 'classic',
      highScore: 0,
      streak: 0,
      difficulty: 'easy',
      hintsUsed: 0,
      questionStartTime: 0,
      targetCountry: null,
      options: [],
      usedCountries: new Set(),

      startGame: (mode) => {
        // Start statistics session
        useStatisticsStore.getState().startSession();
        
        set({
          status: 'playing',
          mode,
          score: 0,
          mistakes: 0,
          streak: 0,
          currentQuestionIndex: 0,
          timeLeft: mode === 'time-attack' ? GAME_CONFIG.TIME_ATTACK_DURATION : undefined,
          difficulty: 'easy',
          hintsUsed: 0,
          usedCountries: new Set(),
        });
        get().nextQuestion();
      },

      calculateDifficulty: () => {
        const { streak, mistakes, currentQuestionIndex, mode } = get();
        
        // Adaptive difficulty for hardcore mode
        if (mode === 'hardcore') {
          const accuracy = currentQuestionIndex > 0 
            ? ((currentQuestionIndex - mistakes) / currentQuestionIndex) * 100 
            : 100;
          
          if (accuracy >= 90 && streak >= 10) {
            set({ difficulty: 'expert' });
          } else if (accuracy >= 75 && streak >= 5) {
            set({ difficulty: 'hard' });
          } else if (accuracy >= 60 || streak >= 3) {
            set({ difficulty: 'medium' });
          } else {
            set({ difficulty: 'easy' });
          }
        } else {
          // Progressive difficulty for other modes
          if (currentQuestionIndex >= 30) {
            set({ difficulty: 'expert' });
          } else if (currentQuestionIndex >= 20) {
            set({ difficulty: 'hard' });
          } else if (currentQuestionIndex >= 10) {
            set({ difficulty: 'medium' });
          } else {
            set({ difficulty: 'easy' });
          }
        }
      },

      nextQuestion: () => {
        const { currentQuestionIndex, mode, difficulty, usedCountries } = get();
        
        // Check win condition (Classic only)
        if (mode === 'classic' && currentQuestionIndex >= GAME_CONFIG.CLASSIC_QUESTIONS_PER_GAME) {
          get().endGame();
          return;
        }

        // Calculate adaptive difficulty
        get().calculateDifficulty();
        
        // Get difficulty config
        const diffConfig = DIFFICULTY_CONFIG[difficulty];
        const optionsCount = mode === 'hardcore' 
          ? diffConfig.optionsCount 
          : (mode === 'time-attack' ? 3 : 2);

        // Get available countries (not used in this game)
        const availableCountries = countries.filter(
          (c) => !usedCountries.has(c.code)
        );
        
        // If we've used all countries, reset the set
        const countriesToUse = availableCountries.length > 0 
          ? availableCountries 
          : countries;

        // Select target country
        const targetCountry = countriesToUse[
          Math.floor(Math.random() * countriesToUse.length)
        ];
        
        // Mark as used
        const newUsedCountries = new Set(usedCountries);
        newUsedCountries.add(targetCountry.code);

        // Get distractors
        const distractors = getRandomItems(
          countriesToUse.filter((c) => c.code !== targetCountry.code),
          optionsCount - 1
        );
        const options = shuffleArray([targetCountry, ...distractors]);

        set({
          targetCountry,
          options,
          currentQuestionIndex: currentQuestionIndex + 1,
          usedCountries: newUsedCountries,
          questionStartTime: Date.now(),
          hintsUsed: 0, // Reset hints for new question
        });
      },

      useHint: () => {
        const { targetCountry, hintsUsed, options } = get();
        if (!targetCountry || hintsUsed >= 2) return null;

        set({ hintsUsed: hintsUsed + 1 });

        // Remove one incorrect option as a hint
        const incorrectOptions = options.filter(
          (opt) => opt.code !== targetCountry.code
        );
        
        if (incorrectOptions.length > 0) {
          const hintToRemove = incorrectOptions[
            Math.floor(Math.random() * incorrectOptions.length)
          ];
          return hintToRemove.code;
        }

        return null;
      },

      submitAnswer: (answer) => {
        const { targetCountry, score, streak, mistakes, mode, questionStartTime, hintsUsed } = get();
        
        if (!targetCountry) return false;

        const isCorrect = answer.code === targetCountry.code;
        const timeSpent = Date.now() - questionStartTime;

        // Record question in statistics
        useStatisticsStore.getState().recordQuestion({
          questionIndex: get().currentQuestionIndex,
          countryCode: targetCountry.code,
          correct: isCorrect,
          timeSpent,
          hintsUsed,
        });

        if (isCorrect) {
          const { difficulty } = get();
          const diffConfig = DIFFICULTY_CONFIG[difficulty];
          
          // Calculate score with difficulty multiplier and time bonus
          const baseScore = GAME_CONFIG.BASE_SCORE;
          const streakBonus = Math.min(streak * GAME_CONFIG.STREAK_BONUS_MULTIPLIER, GAME_CONFIG.MAX_STREAK_BONUS);
          const timeBonus = mode === 'time-attack' ? diffConfig.timeBonus : 0;
          const difficultyMultiplier = diffConfig.scoreMultiplier;
          const hintPenalty = hintsUsed * 2; // Small penalty for using hints
          
          const questionScore = Math.floor(
            (baseScore + streakBonus + timeBonus - hintPenalty) * difficultyMultiplier
          );

          set({
            score: score + questionScore,
            streak: streak + 1,
          });
          return true;
        } else {
          const newMistakes = mistakes + 1;
          set({
            streak: 0,
            mistakes: newMistakes,
          });

          // Loss conditions
          if (mode === 'hardcore' && newMistakes >= GAME_CONFIG.HARDCORE_LIVES) {
            get().endGame();
          }
          return false;
        }
      },

      tickTimer: () => {
        const { timeLeft, status } = get();
        if (status !== 'playing' || timeLeft === undefined) return;

        if (timeLeft <= 0) {
          get().endGame();
        } else {
          set({ timeLeft: timeLeft - 1 });
        }
      },

      endGame: () => {
        const { score, highScore, mode } = get();
        const newHighScore = Math.max(score, highScore);
        
        set({
          status: 'finished',
          highScore: newHighScore,
        });

        // End statistics session
        useStatisticsStore.getState().endSession(score, mode);
        
        // Check for achievements
        const { streak } = get();
        const newAchievements = useStatisticsStore.getState().checkAchievements(score, streak, mode);
        
        // Store achievements for UI display
        if (newAchievements.length > 0) {
          // Achievements will be handled by the statistics store
        }
      },

      resetGame: () => {
        set({
          status: 'idle',
          score: 0,
          mistakes: 0,
          streak: 0,
          currentQuestionIndex: 0,
          difficulty: 'easy',
          hintsUsed: 0,
          usedCountries: new Set(),
        });
      },
    }),
    {
      name: STORAGE_KEYS.HIGH_SCORE,
      partialize: (state) => ({ highScore: state.highScore }),
    }
  )
);
