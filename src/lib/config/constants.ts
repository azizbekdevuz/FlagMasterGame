/**
 * Application constants
 * Centralized configuration values used throughout the application
 */

export const GAME_CONFIG = {
  TIME_ATTACK_DURATION: 60, // seconds
  HARDCORE_LIVES: 3,
  CLASSIC_QUESTIONS_PER_GAME: 50,
  BASE_SCORE: 10,
  STREAK_BONUS_MULTIPLIER: 2,
  MAX_STREAK_BONUS: 50,
} as const;

export const DIFFICULTY_CONFIG = {
  easy: {
    optionsCount: 2,
    timeBonus: 0,
    scoreMultiplier: 1,
  },
  medium: {
    optionsCount: 3,
    timeBonus: 5,
    scoreMultiplier: 1.2,
  },
  hard: {
    optionsCount: 4,
    timeBonus: 10,
    scoreMultiplier: 1.5,
  },
  expert: {
    optionsCount: 6,
    timeBonus: 15,
    scoreMultiplier: 2,
  },
} as const;

export const ACHIEVEMENT_THRESHOLDS = {
  FIRST_WIN: 1,
  PERFECT_GAME: 100,
  STREAK_5: 5,
  STREAK_10: 10,
  STREAK_25: 25,
  STREAK_50: 50,
  SCORE_100: 100,
  SCORE_500: 500,
  SCORE_1000: 1000,
  TIME_ATTACK_30: 30,
  HARDCORE_CLEAR: 1,
} as const;

export const STORAGE_KEYS = {
  THEME: 'flagmaster-theme',
  SOUND_ENABLED: 'flagmaster-sound-enabled',
  HIGH_SCORE: 'flagmaster-high-score',
  STATS: 'flagmaster-stats',
  ACHIEVEMENTS: 'flagmaster-achievements',
} as const;

export const SOUND_CONFIG = {
  CORRECT: '/sounds/correct.wav',
  INCORRECT: '/sounds/incorrect.wav',
  GAME_OVER: '/sounds/game-over.wav',
  ACHIEVEMENT: '/sounds/achievement.wav',
  HINT: '/sounds/hint.wav',
} as const;

export const FLAG_IMAGE_BASE_PATH = '/assets/flags';
export const FLAG_IMAGE_EXTENSION = '.png';

