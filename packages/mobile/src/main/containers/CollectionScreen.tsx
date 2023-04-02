import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '@spotify-clone/shared/api';

import { AppScreenProps } from '../../navigation';
import { Appbar, Avatar, SafeArea } from '../../ui';
import { Screen } from '../components';

const UserAvatar = React.memo<{ size: number }>(props => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0]?.url;
  const imgSrc = useMemo(() => ({ uri: imgUri }), [imgUri]);
  return <Avatar.Image size={props.size} source={imgSrc} />;
});

const renderAvatar = (props: { size: number }) => <UserAvatar {...props} />;

export const CollectionScreen = React.memo<AppScreenProps<'collection'>>(() => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const openAccount = useCallback(() => navigate('account'), [navigate]);
  return (
    <>
      <SafeArea.Top />
      <Appbar mode="medium">
        <Appbar.Action icon={renderAvatar} isLeading onPress={openAccount} />
        <Appbar.Content title={t('collectionPageTitle')} />
      </Appbar>
      <Screen />
    </>
  );
});
