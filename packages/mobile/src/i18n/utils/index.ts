import { findBestAvailableLanguage } from 'react-native-localize';
import { translations } from '@spotify-clone/shared/i18n/config';

export const getLocale = (): string | undefined => {
  const bestAvailable = findBestAvailableLanguage(Object.keys(translations));

  return bestAvailable?.languageTag;
};
