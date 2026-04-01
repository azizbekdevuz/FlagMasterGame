import { createInstance } from 'i18next';
import { i18nConfig } from '@/lib/config/i18n';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

export default async function initI18n(locale: string, namespaces: string[]) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`)))
    .init({
      lng: locale,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces[0],
      ns: namespaces,
      preload: typeof window === 'undefined' ? i18nConfig.locales : [],
    });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}
