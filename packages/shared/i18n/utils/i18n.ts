import i18n from 'i18next';

export const changeLanguage = (language: string) => {
  return i18n.changeLanguage(language);
};

export const getCurrentLanguage = (): string => {
  return i18n.language;
};
