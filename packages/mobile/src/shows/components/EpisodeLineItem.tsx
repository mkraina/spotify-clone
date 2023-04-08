import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { getEpisodeDuration, getEpisodeReleaseDate } from '@spotify-clone/shared/shows';
import { SimplifiedEpisode } from 'spotify-types';

import { LineItem, useLineItemContext } from '../../ui';

export const EpisodeLineItem: React.FC<SimplifiedEpisode> = item => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <LineItem
      onPress={() => navigate('episode', item)}
      image={item.images[0]?.url}
      title={item.name}
      subTitle={t(
        useLineItemContext()?.showExtraInfo ? 'episodeCardSubTitleLong' : 'episodeCardSubTitle',
        {
          releaseDate: getEpisodeReleaseDate(item),
          duration: getEpisodeDuration(item),
        }
      )}
    />
  );
};
