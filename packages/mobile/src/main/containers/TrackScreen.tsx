import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const TrackScreen = React.memo<AppScreenProps<'track'>>(() => {
  return <Screen />;
});
