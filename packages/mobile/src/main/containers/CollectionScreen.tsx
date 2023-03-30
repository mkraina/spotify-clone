import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const CollectionScreen = React.memo<AppScreenProps<'collection'>>(() => {
  return <Screen title="Your library" />;
});
