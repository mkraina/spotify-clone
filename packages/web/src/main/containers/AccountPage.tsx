import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'account'>(props => <Page title="account" />);
