import { Artist, Paging } from 'spotify-types';

import { GridLayout } from '../../ui';

import { ArtistCard } from './ArtistCard';

const renderItem = (item: Artist) => <ArtistCard artist={item} />;
const keyExtractor = (item: Artist) => item.id;

export const ArtistsList: React.FC<{ data: Paging<Artist> | undefined }> = ({ data }) => {
  return (
    <GridLayout
      data={data?.items}
      keyExtractor={keyExtractor}
      paddingX={3}
      paddingY={1}
      renderItem={renderItem}
      spacing={2}
    />
  );
};
