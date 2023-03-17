import { withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'search'>(props => <Page title="search">{props.params.query}</Page>);
