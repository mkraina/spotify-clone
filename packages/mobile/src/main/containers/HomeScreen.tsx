import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserAuthorization, useUserProfile, useUserTop } from '@spotify-clone/shared/api';
import { Artist, TopItemsTimeRange, Track } from 'spotify-types';

import { AppScreenProps } from '../../navigation';
import { Screen } from '../components';

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: 'center' },
  profileImage: { width: 64, height: 64 },
  listsContainer: { flex: 1, flexDirection: 'row' },
  track: { flex: 1, aspectRatio: 1, justifyContent: 'flex-end', backgroundColor: 'black' },
  trackImage: { ...StyleSheet.absoluteFillObject, opacity: 0.7 },
  trackText: { color: 'white', fontWeight: 'bold', margin: 4 },
});

const ArtistPreview = React.memo<{ artist: Artist; isLast: boolean }>(({ artist, isLast }) => {
  const { navigate } = useNavigation();
  const text = isLast ? artist.name : `${artist.name}, `;
  return (
    <Text onPress={useCallback(() => navigate('artist', { id: artist.id }), [artist, navigate])}>
      {text}
    </Text>
  );
});

const TrackPreview = React.memo<{ track: Track }>(({ track }) => {
  const imgUri = track.album.images[0].url;
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={useCallback(() => navigate('track', { id: track.id }), [navigate, track])}
      style={styles.track}
    >
      <Image style={styles.trackImage} source={useMemo(() => ({ uri: imgUri }), [imgUri])} />
      <View>
        <Text numberOfLines={2} style={styles.trackText}>
          {track.name}
        </Text>
        <Text numberOfLines={2} style={styles.trackText}>
          {track.artists.map((a, i) => (
            <ArtistPreview key={a.id} artist={a} isLast={i === track.artists.length - 1} />
          ))}
        </Text>
      </View>
    </TouchableOpacity>
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
        <TrackPreview key={item.id} track={item} />
      ))}
    </ScrollView>
  );
});

const User = React.memo(() => {
  const user = useUserProfile();
  const imgUri = user.data?.images[0].url;
  const imgSrc = useMemo(() => ({ uri: imgUri }), [imgUri]);
  const { navigate } = useNavigation();
  const openAccount = useCallback(() => navigate('account'), [navigate]);
  if (!user.data) {
    return null;
  }
  return (
    <TouchableOpacity onPress={openAccount}>
      <Image style={styles.profileImage} source={imgSrc} />
      <Text>{user.data.display_name}</Text>
    </TouchableOpacity>
  );
});

export const HomeScreen = React.memo<AppScreenProps<'home'>>(() => {
  const { t } = useTranslation();
  const [, setUserAuthorization] = useUserAuthorization();
  const { navigate } = useNavigation();

  return (
    <Screen>
      <Text>{t('welcomeMessage')}</Text>
      <Button
        onPress={useCallback(() => setUserAuthorization(undefined), [setUserAuthorization])}
        title="log out"
      />
      <Button onPress={useCallback(() => navigate('search', {}), [navigate])} title="search" />
      <User />
      <View style={styles.listsContainer}>
        <TopTracksList range="long_term" />
        <TopTracksList range="medium_term" />
        <TopTracksList range="short_term" />
      </View>
    </Screen>
  );
});
