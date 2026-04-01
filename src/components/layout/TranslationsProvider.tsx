"use client";

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/app/i18n'; // We need to creating this util logic
import { ReactNode } from 'react';

// Simplified provider for now, assuming standard next-i18n-router pattern usually 
// handles resources via a server component wrapper or direct useTranslation in server components.
// For Client Components to access translations passed from Server:

import React from 'react';

export default function TranslationsProvider({
    children,
    locale,
    namespaces,
    resources
}: {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources: any;
}) {
    const i18n = createInstance();

    i18n.init({
        lng: locale,
        resources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'ko', 'uz'],
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        preload: resources ? [] : [locale]
    });

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
