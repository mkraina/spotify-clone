import React from 'react';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

export const CategoryScreen = React.memo<AppScreenProps<'category'>>(() => {
  return <Screen type="scroll" />;
});
