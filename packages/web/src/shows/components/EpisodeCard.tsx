import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { SimplifiedEpisode } from 'spotify-types';

import { routes } from '../../navigation';
import { Card } from '../../ui';

export const EpisodeCard: React.FC<{ episode: SimplifiedEpisode }> = ({ episode }) => {
  const duration = Math.ceil(episode.duration_ms / 1000 / 60);
  const releaseDate = format(new Date(episode.release_date), 'MMM d');
  const { t } = useTranslation();
  return (
    <Card
      href={routes.episode(episode)}
      image={episode.images[0]?.url}
      subTitle={t('episodeCardSubTitle', { releaseDate, duration })}
      title={episode.name}
      trackId={episode.id}
    />
  );
};
