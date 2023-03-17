import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'track'>(props => <Page title="track">{props.params.id}</Page>);
