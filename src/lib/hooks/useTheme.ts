/**
 * Theme hook for managing light/dark theme
 * Persists theme preference in localStorage
 */

'use client';

import { useEffect, useState } from 'react';
import { ThemeMode } from '@/lib/config/theme';
import { STORAGE_KEYS } from '@/lib/config/constants';

/**
 * Custom hook to manage theme state
 * @returns Object with current theme, toggle function, and setTheme function
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage, default to dark
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Default to dark theme
      setThemeState('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}

