import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { authService, onAuthorizationCodeReceived } from '../../auth';
import { Page } from '../components/Page';

const AuthPage: React.FC = () => {
  useEffect(() => {
    onAuthorizationCodeReceived(window.location.search);
  }, []);
  const { t } = useTranslation();
  return (
    <Page title="login">
      <button onClick={authService.authorize}>{t('loginButton')}</button>
    </Page>
  );
};

export default AuthPage;
