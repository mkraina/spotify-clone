import { InitOptions } from 'i18next';

import cs from './cs.json';
import en from './en.json';

export type I18nDictionary = Record<string, { translation: typeof en }>;
export type TranslationKey = keyof typeof en;
const entries: Record<string, Partial<typeof en>> = { en, cs };
export const translations: I18nDictionary = Object.entries(entries).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: { translation: value } }),
  {}
);

export const availableLanguages: string[] = Object.keys(entries);

export const i18nConfig: InitOptions = {
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: translations,
  interpolation: {
    escapeValue: false,
  },
};
