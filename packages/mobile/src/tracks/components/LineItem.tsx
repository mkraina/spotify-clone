import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Track } from 'spotify-types';

import { LineItem, useLineItemContext } from '../../ui';

export const TrackLineItem: React.FC<Track> = item => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <LineItem
      onPress={() => navigate('track', item)}
      image={item.album.images[0]?.url || item.artists[0]?.images[0]?.url}
      title={item.name}
      subTitle={`${
        useLineItemContext()?.showExtraInfo ? `${t('trackCardSubTitle')} · ` : ''
      }${item.artists.map(a => a.name).join(', ')}`}
    />
  );
};
