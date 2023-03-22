import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'artist'>(props => <Page title="artist">{props.params.id}</Page>);
