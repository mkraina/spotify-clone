import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const ArtistScreen = React.memo<AppScreenProps<'artist'>>(() => {
  return <Screen />;
});
