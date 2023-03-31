import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const AlbumScreen = React.memo<AppScreenProps<'album'>>(() => <Screen />);
