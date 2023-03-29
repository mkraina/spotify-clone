import { ScreenName, ScreenParamList } from '@spotify-clone/shared/navigation';

export type Paths = {
  [P in ScreenName]: ScreenParamList[P] extends undefined
    ? P extends 'home'
      ? '/'
      : `/${P}`
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `/${P}/:${keyof ScreenParamList[P]}${'?' | ''}`;
};

export type PathName = '/' | `/${Exclude<ScreenName, 'home'>}/`;

export type Routes = {
  [P in ScreenName]: ScreenParamList[P] extends undefined
    ? P extends 'home'
      ? '/'
      : `/${P}`
    : (param: ScreenParamList[P]) => `/${P}/${string}`;
};

export type PageParams<T extends ScreenName> = ScreenParamList[T] extends undefined
  ? Record<string, never>
  : ScreenParamList[T];
