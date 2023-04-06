import { useTranslation } from 'react-i18next';
import { getEpisodeDuration, getEpisodeReleaseDate } from '@spotify-clone/shared/shows';
import { SimplifiedEpisode } from 'spotify-types';

import { routes } from '../../navigation';
import { Card } from '../../ui';

export const EpisodeCard: React.FC<{ episode: SimplifiedEpisode }> = ({ episode }) => {
  const { t } = useTranslation();
  return (
    <Card
      href={routes.episode(episode)}
      image={episode.images[0]?.url}
      subTitle={t('episodeCardSubTitle', {
        releaseDate: getEpisodeReleaseDate(episode),
        duration: getEpisodeDuration(episode),
      })}
      title={episode.name}
      trackId={episode.id}
    />
  );
};
