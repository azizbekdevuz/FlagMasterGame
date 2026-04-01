/**
 * Hint button component
 * Allows players to get hints during gameplay
 */

'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface HintButtonProps {
  onHintUsed?: (removedOption: string) => void;
}

export function HintButton({ onHintUsed }: HintButtonProps) {
  const { hintsUsed, useHint, options } = useGameStore();
  const { t } = useTranslation();
  const maxHints = 2;
  const canUseHint = hintsUsed < maxHints && options.length > 2;

  const handleClick = () => {
    if (!canUseHint) return;
    
    const removedOption = useHint();
    if (removedOption && onHintUsed) {
      onHintUsed(removedOption);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={!canUseHint}
      className={cn(
        "gap-2 transition-all duration-300",
        canUseHint && "hover:bg-warning-500/10 hover:border-warning-500 hover:text-warning-400"
      )}
      aria-label={`Use hint (${maxHints - hintsUsed} remaining)`}
    >
      <Lightbulb className={cn(
        "w-4 h-4 transition-transform",
        canUseHint && "hover:rotate-12"
      )} />
      <span className="font-mono text-xs">
        {hintsUsed}/{maxHints}
      </span>
    </Button>
  );
}

