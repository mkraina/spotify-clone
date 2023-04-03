import { SimplifiedShow } from 'spotify-types';

import { routes } from '../../navigation';
import { Card } from '../../ui';

export const ShowCard: React.FC<{ show: SimplifiedShow }> = ({ show }) => {
  return (
    <Card
      href={routes.show(show)}
      image={show.images[0]?.url}
      subTitle={show.publisher}
      title={show.name}
    />
  );
};
