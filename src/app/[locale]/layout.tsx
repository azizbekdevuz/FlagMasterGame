/**
 * Root layout component
 * Wraps all pages with translations, theme, and error boundaries
 */

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/layout/TranslationsProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { i18nConfig } from '@/lib/config/i18n';
import { dir } from 'i18next';
import "@/app/globals.css";

// Generate static params for static generation (optional but good for performance)
export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const namespaces = ['common'];

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, namespaces);

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col transition-colors duration-300">
        <ErrorBoundary>
          <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
            <Header />
            <main className="flex-grow pt-16 sm:pt-20 md:pt-24">
              {children}
            </main>
            <Footer />
          </TranslationsProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
