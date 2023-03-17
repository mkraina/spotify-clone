import { StackScreenProps } from '@react-navigation/stack';
import { ScreenParamList } from '@spotify-clone/shared/navigation';

type ParamList<T extends keyof ScreenParamList> = Pick<ScreenParamList, T>;

export type RootStackParamList = ParamList<'account' | 'artist' | 'home' | 'search' | 'track'>;

export type AppParamList = RootStackParamList;

export type AppScreenName = keyof AppParamList;

export type AppScreenProps<T extends AppScreenName> = StackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
