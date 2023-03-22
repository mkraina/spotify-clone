import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const SearchScreen = React.memo<AppScreenProps<'search'>>(() => <Screen title="Search" />);
