/**
 * Achievement icon component
 * Renders Lucide icons for achievements based on icon name
 */

'use client';

import React from 'react';
import { getAchievementIcon } from '@/lib/config/achievements';
import { Achievement } from '@/lib/types/statistics';
import { cn } from '@/lib/utils';

interface AchievementIconProps {
  achievement: Achievement;
  size?: number;
  className?: string;
}

export function AchievementIcon({ achievement, size = 24, className }: AchievementIconProps) {
  const IconComponent = getAchievementIcon(achievement.icon);

  // Color based on rarity
  const rarityColors = {
    common: 'text-foreground/60',
    rare: 'text-brand-400',
    epic: 'text-accent-400',
    legendary: 'text-warning-400',
  };

  return (
    <IconComponent
      className={cn(
        'transition-colors',
        rarityColors[achievement.rarity],
        className
      )}
      size={size}
      aria-hidden="true"
    />
  );
}

