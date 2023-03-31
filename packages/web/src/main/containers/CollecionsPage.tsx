import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes, withParams } from '../../navigation';
import { Page } from '../components/Page';

export default withParams<'collection'>(props => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.params.type) return;
    navigate(routes.collection({ type: 'playlists' }), { replace: true });
  }, [navigate, props.params.type]);
  return <Page />;
});
