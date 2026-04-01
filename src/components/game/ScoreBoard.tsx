/**
 * Score board component
 * Displays current game statistics during gameplay
 * Optimized for all device sizes
 */

'use client';

import React from 'react';
import { Trophy, Flame, HeartCrack } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';

export const ScoreBoard = () => {
  const { score, streak, mistakes, mode } = useGameStore();

  return (
    <div
      className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-surface-glass border border-white/5 backdrop-blur-md shadow-lg"
      role="status"
      aria-live="polite"
      aria-label={`Score: ${score}, Streak: ${streak}${mode === 'hardcore' ? `, Lives: ${3 - mistakes}` : ''}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400 flex-shrink-0" aria-hidden="true" />
        <span className="font-mono font-bold text-sm sm:text-base md:text-lg">{score}</span>
        <span className="sr-only">points</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 border-l border-white/10 pl-2 sm:pl-3 md:pl-4">
        <Flame
          className={cn(
            "w-4 h-4 sm:w-5 sm:h-5 transition-colors flex-shrink-0",
            streak > 2 ? 'text-warning-500 animate-pulse' : 'text-foreground/40'
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "font-mono font-bold text-sm sm:text-base md:text-lg",
            streak > 2 ? 'text-warning-400' : 'text-foreground/60'
          )}
        >
          {streak}
        </span>
        <span className="sr-only">streak</span>
      </div>

      {mode === 'hardcore' && (
        <div className="flex items-center gap-1.5 sm:gap-2 border-l border-white/10 pl-2 sm:pl-3 md:pl-4">
          <HeartCrack className="w-4 h-4 sm:w-5 sm:h-5 text-error-400 flex-shrink-0" aria-hidden="true" />
          <span className="font-mono font-bold text-sm sm:text-base md:text-lg text-error-400">
            {3 - mistakes}
          </span>
          <span className="sr-only">lives remaining</span>
        </div>
      )}
    </div>
  );
};
