import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { ScreenName, ScreenParamList } from '@spotify-clone/shared/navigation';

type ParamList<T extends ScreenName> = Pick<ScreenParamList, T>;

export type MainTabParamList = ParamList<'home' | 'search' | 'collection'>;

export type RootStackParamList = ParamList<'account' | 'artist' | 'track'> & {
  mainTabs: undefined;
};

export type AppParamList = RootStackParamList & MainTabParamList;

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
