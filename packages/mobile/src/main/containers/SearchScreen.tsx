import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppScreenProps } from '../../navigation';
import { SafeArea } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

const stickyHeaderIndices = [0];

export const SearchScreen = React.memo<AppScreenProps<'search'>>(() => {
  const { t } = useTranslation();
  return (
    <>
      <SafeArea.Top />
      <Screen stickyHeaderIndices={stickyHeaderIndices}>
        <Header title={t('searchInputPlaceholder')} />
      </Screen>
    </>
  );
});
