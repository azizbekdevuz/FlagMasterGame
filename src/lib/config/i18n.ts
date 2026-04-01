/**
 * Internationalization configuration
 * Defines supported locales and default locale for the application
 */
export const i18nConfig = {
  locales: ['en', 'ko', 'uz'] as const,
  defaultLocale: 'en' as const,
  prefixDefault: false,
} as const;

export type Locale = typeof i18nConfig.locales[number];

