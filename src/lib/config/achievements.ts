/**
 * Achievements configuration
 * Defines all unlockable achievements with metadata
 * Uses Lucide React icon names
 */

import { Achievement } from '@/lib/types/statistics';
import {
  Target,
  Trophy,
  Gem,
  Crown,
  Flame,
  Zap,
  Star,
  Sparkles,
  Shield,
  Timer,
  Sparkle,
} from 'lucide-react';

// Icon mapping for achievements
export const ACHIEVEMENT_ICONS = {
  Target,
  Trophy,
  Gem,
  Crown,
  Flame,
  Zap,
  Star,
  Sparkles,
  Shield,
  Timer,
  Sparkle,
} as const;

export type AchievementIconName = keyof typeof ACHIEVEMENT_ICONS;

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_win: {
    id: 'first_win',
    name: 'First Steps',
    description: 'Complete your first game',
    icon: 'Target',
    unlockedAt: '',
    rarity: 'common',
  },
  score_100: {
    id: 'score_100',
    name: 'Centurion',
    description: 'Score 100 points in a single game',
    icon: 'Trophy',
    unlockedAt: '',
    rarity: 'common',
  },
  score_500: {
    id: 'score_500',
    name: 'Half Grand',
    description: 'Score 500 points in a single game',
    icon: 'Gem',
    unlockedAt: '',
    rarity: 'rare',
  },
  score_1000: {
    id: 'score_1000',
    name: 'Grand Master',
    description: 'Score 1000 points in a single game',
    icon: 'Crown',
    unlockedAt: '',
    rarity: 'epic',
  },
  streak_5: {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Get a 5 question streak',
    icon: 'Flame',
    unlockedAt: '',
    rarity: 'common',
  },
  streak_10: {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Get a 10 question streak',
    icon: 'Zap',
    unlockedAt: '',
    rarity: 'rare',
  },
  streak_25: {
    id: 'streak_25',
    name: 'Legendary',
    description: 'Get a 25 question streak',
    icon: 'Star',
    unlockedAt: '',
    rarity: 'epic',
  },
  streak_50: {
    id: 'streak_50',
    name: 'Perfect Storm',
    description: 'Get a 50 question streak',
    icon: 'Sparkles',
    unlockedAt: '',
    rarity: 'legendary',
  },
  hardcore_clear: {
    id: 'hardcore_clear',
    name: 'Survivor',
    description: 'Complete a hardcore mode game',
    icon: 'Shield',
    unlockedAt: '',
    rarity: 'rare',
  },
  time_attack_30: {
    id: 'time_attack_30',
    name: 'Speed Demon',
    description: 'Score 30+ in time attack mode',
    icon: 'Timer',
    unlockedAt: '',
    rarity: 'rare',
  },
  perfect_game: {
    id: 'perfect_game',
    name: 'Flawless',
    description: 'Complete a game with 100% accuracy',
    icon: 'Sparkle',
    unlockedAt: '',
    rarity: 'epic',
  },
};

/**
 * Get the icon component for an achievement
 */
export function getAchievementIcon(iconName: string) {
  return ACHIEVEMENT_ICONS[iconName as AchievementIconName] || Trophy;
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS[id];
}

export function getAchievementsByIds(ids: string[]): Achievement[] {
  return ids.map((id) => ACHIEVEMENTS[id]).filter(Boolean) as Achievement[];
}
