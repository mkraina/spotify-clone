import './styles.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiProvider, useUserProfile } from '@spotify-clone/shared/api';
import { LocalizationProvider } from '@spotify-clone/shared/i18n';

import { AuthButton } from '../auth';
import { getLocale } from '../i18n/utils';

const User = () => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  return (
    <>
      <img src={imgUri} />
      {user.data?.display_name}
    </>
  );
};
const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <p>{t('welcomeMessage')}</p>
        <AuthButton />
        <User />
      </header>
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <ApiProvider>
      <LocalizationProvider detect={getLocale}>
        <App />
      </LocalizationProvider>
    </ApiProvider>
  );
};

export default Main;
