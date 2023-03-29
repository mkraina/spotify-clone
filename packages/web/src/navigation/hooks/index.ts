import { useLocation, useParams as _useParams } from 'react-router-dom';
import { ScreenName } from '@spotify-clone/shared/navigation';

import { PageParams } from '../types';

export const useParams = <T extends ScreenName>() => _useParams() as PageParams<T>;
export const usePathName = (): ScreenName => {
  const path = useLocation().pathname.split('/')[1]?.replaceAll('/', '') as ScreenName | '';
  return path || 'home';
};
