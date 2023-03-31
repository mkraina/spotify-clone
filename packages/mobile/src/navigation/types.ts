import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { ScreenName, ScreenParamList } from '@spotify-clone/shared/navigation';

type ParamList<T extends ScreenName> = Pick<ScreenParamList, T>;

type SharedStackParamList<
  Initial extends ScreenName | string,
  Extra extends ScreenName = ScreenName
> = (Initial extends ScreenName
  ? ScreenParamList[Initial] extends undefined
    ? ParamList<Initial>
    : ParamList<Initial> | Record<Initial, undefined>
  : Record<Initial, undefined>) &
  ParamList<'artist' | 'album' | Extra>;

export type HomeStackParamList = SharedStackParamList<'home'>;
export type SearchStackParamList = SharedStackParamList<'searchInit', 'search'>;
export type CollectionsStackParamList = SharedStackParamList<'collection'>;
export type MainTabParamList = Record<'homeStack' | 'searchStack' | 'collectionsStack', undefined>;

export type RootStackParamList = ParamList<'account' | 'track'> & {
  mainTabs: undefined;
};

export type AppParamList = RootStackParamList &
  MainTabParamList &
  HomeStackParamList &
  SearchStackParamList &
  CollectionsStackParamList;

export type AppScreenName = keyof AppParamList;

export type AppScreenProps<T extends AppScreenName> = T extends keyof MainTabParamList
  ? BottomTabScreenProps<MainTabParamList, T>
  : StackScreenProps<AppParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends AppParamList {}
  }
}
