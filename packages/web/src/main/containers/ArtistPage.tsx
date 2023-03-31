import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'artist'>(props => <Page>{props.params.id}</Page>);
