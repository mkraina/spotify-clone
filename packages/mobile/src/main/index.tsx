import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button as RNButton,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ApiProvider, useAccessToken, useUserProfile, useUserTop } from '@spotify-clone/shared/api';
import { LocalizationProvider } from '@spotify-clone/shared/i18n';
import { TopItemsTimeRange, Track } from 'spotify-types';

import { auth } from '../auth';
import { getLocale } from '../i18n';

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: 'center' },
  profileImage: { width: 64, height: 64 },
  listsContainer: { flex: 1, flexDirection: 'row' },
  track: { flex: 1, aspectRatio: 1, justifyContent: 'flex-end', backgroundColor: 'black' },
  trackImage: { ...StyleSheet.absoluteFillObject, opacity: 0.7 },
  trackText: { color: 'white', fontWeight: 'bold', margin: 4 },
});

const TrackPreview = React.memo<Track>(props => {
  const imgUri = props.album.images[0].url;
  return (
    <View style={styles.track}>
      <Image style={styles.trackImage} source={useMemo(() => ({ uri: imgUri }), [imgUri])} />
      <View>
        <Text numberOfLines={2} style={styles.trackText}>
          {props.name}
        </Text>
        <Text numberOfLines={2} style={styles.trackText}>
          {props.artists.map(a => a.name).join(', ')}
        </Text>
      </View>
    </View>
  );
});

const TopTracksList = React.memo<{ range: TopItemsTimeRange }>(({ range }) => {
  const userTop = useUserTop('tracks', range);
  if (!userTop.data) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <Text>{range}</Text>
      {userTop.data.items.map(item => (
        <TrackPreview key={item.id} {...item} />
      ))}
    </ScrollView>
  );
});

const User = React.memo(() => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  const imgSrc = useMemo(() => ({ uri: imgUri }), [imgUri]);
  if (!user.data) {
    return null;
  }
  return (
    <>
      <Image style={styles.profileImage} source={imgSrc} />
      <Text>{user.data.display_name}</Text>
    </>
  );
});

const App = React.memo(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const [accessToken, setAccessToken] = useAccessToken();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text>{t('welcomeMessage')}</Text>
        <RNButton
          onPress={useCallback(
            () => (accessToken ? setAccessToken(undefined) : auth().then(setAccessToken)),
            [accessToken, setAccessToken]
          )}
          title={accessToken ? 'log out' : 'authorize'}
        />
        <User />
        <View style={styles.listsContainer}>
          <TopTracksList range="long_term" />
          <TopTracksList range="medium_term" />
          <TopTracksList range="short_term" />
        </View>
      </View>
    </SafeAreaView>
  );
});

export default () => (
  <ApiProvider>
    <LocalizationProvider detect={getLocale}>
      <App />
    </LocalizationProvider>
  </ApiProvider>
);
