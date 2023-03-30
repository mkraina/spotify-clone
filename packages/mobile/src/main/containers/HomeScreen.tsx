/* eslint-disable react/jsx-no-literals */
import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile, useUserTop } from '@spotify-clone/shared/api';
import { Artist, TopItemsTimeRange, Track } from 'spotify-types';

import { authService } from '../../auth';
import { AppScreenProps } from '../../navigation';
import { StyleSheet } from '../../ui';
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
  const { navigate } = useNavigation();

  return (
    <Screen type="scroll">
      <Button mode="contained" onPress={authService.logout}>
        log out
      </Button>
      <Button mode="elevated" onPress={useCallback(() => navigate('search', {}), [navigate])}>
        search
      </Button>
      <Button onPress={authService.logout}>logout</Button>
      <Button onPress={authService.refresh}>refresh</Button>
      <User />
      <View style={styles.listsContainer}>
        <TopTracksList range="long_term" />
        <TopTracksList range="medium_term" />
        <TopTracksList range="short_term" />
      </View>
    </Screen>
  );
});
