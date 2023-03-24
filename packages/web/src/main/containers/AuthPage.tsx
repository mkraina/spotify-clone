import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserAuthorization } from '@spotify-clone/shared/api';

import { auth, onAuthorizationCodeReceived } from '../../auth';
import { Page } from '../components/Page';

const AuthPage: React.FC = () => {
  useEffect(() => {
    onAuthorizationCodeReceived(window.location.search);
  }, []);
  const [, setUserAuthorization] = useUserAuthorization();
  const { t } = useTranslation();
  return (
    <Page title="login">
      <button
        onClick={useCallback(() => {
          void auth().then(setUserAuthorization);
        }, [setUserAuthorization])}
      >
        {t('loginButton')}
      </button>
    </Page>
  );
};

export default AuthPage;
