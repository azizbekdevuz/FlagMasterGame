/**
 * Sound toggle button component
 * Allows users to enable/disable sound effects
 */

'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSound } from '@/lib/hooks/useSound';
import { cn } from '@/lib/utils';

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      aria-label={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
      className={cn(
        "w-10 h-10 transition-all duration-300",
        "hover:bg-surface-glassHover",
        "focus-ring"
      )}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
      ) : (
        <VolumeX className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
      )}
    </Button>
  );
}

