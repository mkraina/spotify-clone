export const getLocale = (): string | undefined => {
  const locale = navigator.languages[0] || navigator.language;
  if (!locale) return;
  return locale.trim().split(/-|_/)[0];
};
