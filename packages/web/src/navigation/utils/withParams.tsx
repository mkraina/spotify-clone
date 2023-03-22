import { ScreenName } from '@spotify-clone/shared/navigation';

import { useParams } from '../hooks';
import { PageParams } from '../types';

export type PropsWithPageParams<T extends ScreenName> = { params: PageParams<T> };
export const withParams = <T extends ScreenName>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: React.FC<PropsWithPageParams<T>>
): React.FC => {
  return () => <Component params={useParams<T>()} />;
};
