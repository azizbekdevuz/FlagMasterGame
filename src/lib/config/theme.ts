/**
 * Theme configuration and design tokens
 * Defines all color schemes, spacing, typography, and animation tokens
 */

export const themeConfig = {
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      DEFAULT: '#0ea5e9',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f0d0ff',
      300: '#e879f9',
      400: '#d946ef',
      500: '#c026d3',
      600: '#a21caf',
      700: '#86198f',
      DEFAULT: '#e879f9',
    },
    surface: {
      50: '#121212',
      100: '#1e1e1e',
      200: '#2d2d2d',
      300: '#3d3d3d',
      glass: 'rgba(255, 255, 255, 0.05)',
      glassHover: 'rgba(255, 255, 255, 0.1)',
    },
    success: {
      500: '#22c55e',
      600: '#16a34a',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: {
      brand: '0 0 20px rgba(14, 165, 233, 0.3)',
      accent: '0 0 20px rgba(232, 121, 249, 0.3)',
      success: '0 0 20px rgba(34, 197, 94, 0.3)',
      error: '0 0 20px rgba(239, 68, 68, 0.3)',
    },
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  background: '#ffffff',
  foreground: '#0f172a',
  surface: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    glass: 'rgba(15, 23, 42, 0.05)',
    glassHover: 'rgba(15, 23, 42, 0.1)',
  },
} as const;

export const darkTheme = {
  background: '#0f172a',
  foreground: '#f8fafc',
  surface: {
    50: '#121212',
    100: '#1e1e1e',
    200: '#2d2d2d',
    300: '#3d3d3d',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassHover: 'rgba(255, 255, 255, 0.1)',
  },
} as const;

