import React, { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n, { LanguageDetectorModule } from 'i18next';

import { i18nConfig } from '../config';

const initI18N = (detect: () => string | undefined) => {
  const languageDetector: LanguageDetectorModule = {
    type: 'languageDetector',
    detect: () =>
      detect() || (typeof i18nConfig.fallbackLng === 'string' ? i18nConfig.fallbackLng : undefined),
    init: () => {},
    cacheUserLanguage: () => {},
  };

  return i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init(i18nConfig, err => {
      if (err) {
        return console.warn('something went wrong loading', err);
      }
    });
};

export const LocalizationProvider = React.memo<{
  children: React.ReactElement;
  getLocale: () => string | undefined;
}>(({ children, getLocale }) => {
  const [isInitiated, setIsInitiated] = useState(false);
  useEffect(() => {
    initI18N(getLocale)
      .catch(console.warn)
      .finally(() => setIsInitiated(true));
  }, [getLocale]);
  if (!isInitiated) return null;
  return children;
});
