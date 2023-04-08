import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SimplifiedAlbum } from 'spotify-types';

import { LineItem, useLineItemContext } from '../../ui';

export const AlbumLineItem: React.FC<SimplifiedAlbum> = item => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <LineItem
      onPress={() => navigate('album', item)}
      image={item.images[0]?.url}
      title={item.name}
      subTitle={`${
        useLineItemContext()?.showExtraInfo ? `${t('albumCardSubTitle')} · ` : ''
      }${item.artists.map(a => a.name).join(', ')}`}
    />
  );
};
