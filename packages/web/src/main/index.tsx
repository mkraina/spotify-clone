import './styles.css';

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages, LocalizationProvider } from '@spotify-clone/shared/i18n';
import { changeLanguage } from 'i18next';

import { AuthButton } from '../auth';
import { getLocale } from '../i18n/utils';

const Button: React.FC<{ children: string }> = ({ children }) => {
  return (
    <button onClick={useCallback(() => changeLanguage(children), [children])}>{children}</button>
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <p>{t('welcomeMessage')}</p>
        {availableLanguages.map(lang => (
          <Button key={lang}>{lang}</Button>
        ))}
        <AuthButton />
      </header>
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <LocalizationProvider detect={getLocale}>
      <App />
    </LocalizationProvider>
  );
};

export default Main;
