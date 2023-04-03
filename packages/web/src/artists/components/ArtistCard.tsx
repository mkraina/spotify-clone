import { useTranslation } from 'react-i18next';
import { Artist } from 'spotify-types';

import { routes } from '../../navigation';
import { Card } from '../../ui';

export const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  const { t } = useTranslation();

  return (
    <Card
      href={routes.artist(artist)}
      image={artist.images[0]?.url}
      roundAvatar
      subTitle={t('artistCardSubtitle')}
      title={artist.name}
      trackId={artist.id}
    />
  );
};
