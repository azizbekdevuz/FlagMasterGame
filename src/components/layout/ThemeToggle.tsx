/**
 * Theme toggle button component
 * Allows users to switch between light and dark themes
 */

'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="w-10 h-10"
        disabled
      >
        <Sun className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        "w-10 h-10 transition-all duration-300",
        "hover:bg-surface-glassHover",
        "focus-ring"
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}

