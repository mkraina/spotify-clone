import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppScreenProps } from '../../navigation';
import { Appbar, SafeArea } from '../../ui';
import { Screen } from '../components';

export const HomeScreen = React.memo<AppScreenProps<'home'>>(() => {
  const { t } = useTranslation();

  return (
    <>
      <SafeArea.Top />
      <Screen type="scroll">
        <Appbar mode="medium">
          <Appbar.Content title={t('homePageTitleEvening')} />
        </Appbar>
      </Screen>
    </>
  );
});
