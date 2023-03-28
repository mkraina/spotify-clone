/* eslint-disable react/jsx-no-literals */
import Button from '@mui/material/Button';
import { useUserProfile } from '@spotify-clone/shared/api';

import { authService } from '../../auth';
import { withParams } from '../../navigation/utils';
import { Page } from '../components/Page';

const HomePage: React.FC = () => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  return (
    <Page title="home">
      <>
        <img src={imgUri} />
        {user.data?.display_name}
        <Button onClick={authService.logout}>logout</Button>
        <Button onClick={authService.refresh}>refresh</Button>
      </>
    </Page>
  );
};

export default withParams<'home'>(HomePage);
