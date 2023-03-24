/* eslint-disable react/jsx-no-literals */
import { useTranslation } from 'react-i18next';
import { useUserProfile } from '@spotify-clone/shared/api';

import { authService } from '../../auth';
import { withParams } from '../../navigation/utils';
import { Page } from '../components/Page';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  return (
    <Page title="home">
      <p>{t('welcomeMessage')}</p>
      <>
        <img src={imgUri} />
        {user.data?.display_name}
        <button onClick={authService.logout}>logout</button>
        <button onClick={authService.refresh}>refresh</button>
      </>
    </Page>
  );
};

export default withParams<'home'>(HomePage);
