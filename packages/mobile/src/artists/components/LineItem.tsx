import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Artist } from 'spotify-types';

import { LineItem, useLineItemContext } from '../../ui';

export const ArtistLineItem: React.FC<Artist> = item => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <LineItem
      onPress={() => navigate('artist', item)}
      image={item.images[0]?.url}
      title={item.name}
      roundedAvatar
      subTitle={useLineItemContext()?.showExtraInfo ? t('artistCardSubTitle') : undefined}
    />
  );
};
