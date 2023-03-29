/* eslint-disable react/jsx-no-literals */
import Button from '@mui/material/Button';

import { authService } from '../../auth';
import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'account'>(props => (
  <Page>
    <Button onClick={authService.logout}>logout</Button>
    <Button onClick={authService.refresh}>refresh</Button>
  </Page>
));
