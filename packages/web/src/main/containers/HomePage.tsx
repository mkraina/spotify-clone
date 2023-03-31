import { withParams } from '../../navigation/utils';
import { Page } from '../components/Page';

const HomePage: React.FC = () => {
  return <Page />;
};

export default withParams<'home'>(HomePage);
