import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '@spotify-clone/shared/api';
import { spacing } from '@spotify-clone/shared/ui';

import { AppScreenProps } from '../../navigation';
import { SafeArea, StyleSheet, Touchable } from '../../ui';
import { Screen } from '../components';
import { Header, headerIconSize } from '../components/Header';

const styles = StyleSheet.create({ avatar: { padding: spacing(), borderRadius: 360 } });

const UserAvatar = React.memo(() => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  const imgSrc = useMemo(() => ({ uri: imgUri }), [imgUri]);
  const { navigate } = useNavigation();
  const openAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Touchable onPress={openAccount} style={styles.avatar}>
      <Avatar.Image size={headerIconSize} source={imgSrc} />
    </Touchable>
  );
});

export const CollectionScreen = React.memo<AppScreenProps<'collection'>>(() => {
  const { t } = useTranslation();
  return (
    <>
      <SafeArea.Top />
      <Header
        title={t('collectionPageTitle')}
        startContent={useMemo(
          () => (
            <UserAvatar />
          ),
          []
        )}
      />
      <Screen />
    </>
  );
});
