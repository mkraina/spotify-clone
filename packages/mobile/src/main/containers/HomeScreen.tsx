import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppScreenProps } from '../../navigation';
import { SafeArea } from '../../ui';
import { Screen } from '../components';
import { Header } from '../components/Header';

export const HomeScreen = React.memo<AppScreenProps<'home'>>(() => {
  const { t } = useTranslation();

  return (
    <>
      <SafeArea.Top />
      <Screen type="scroll">
        <Header
          //TODO: support dynamic label per day phase
          title={t('homePageTitleEvening')}
        />
      </Screen>
    </>
  );
});
