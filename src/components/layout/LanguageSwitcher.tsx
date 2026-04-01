"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '@/lib/config/i18n';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange = (newLocale: string) => {
        // Determine new path
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // Redirect to new path
        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
        }

        router.refresh();
    };

    return (
        <div className="flex gap-1 sm:gap-2 p-0.5 sm:p-1 rounded-full bg-surface-glass border border-white/10 backdrop-blur-md">
            {['en', 'ko', 'uz'].map((locale) => (
                <button
                    key={locale}
                    onClick={() => handleChange(locale)}
                    className={cn(
                        "px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-mono font-bold rounded-full transition-all duration-200",
                        currentLocale === locale
                            ? 'bg-brand-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.4)]'
                            : 'text-foreground/60 hover:text-white hover:bg-white/5'
                    )}
                    aria-label={`Switch to ${locale.toUpperCase()} language`}
                >
                    {locale.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
