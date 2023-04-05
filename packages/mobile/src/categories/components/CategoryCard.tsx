import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '@spotify-clone/shared/ui';
import { Category } from 'spotify-types';

import { StyleSheet, Text, TouchableRipple } from '../../ui';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: spacing(0.5),
    padding: spacing(),
    aspectRatio: 1,
  },
  label: { fontWeight: 'bold' },
});

export const CategoryCard = React.memo<{ category: Category; style?: StyleProp<ViewStyle> }>(
  ({ category, style }) => {
    const { navigate } = useNavigation();
    return (
      <TouchableRipple
        style={[styles.container, style]}
        onPress={() => navigate('category', { id: category.id })}
      >
        <>
          <FastImage
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            source={{ uri: category.icons[0]?.url }}
          />
          <Text style={styles.label}>{category.name}</Text>
        </>
      </TouchableRipple>
    );
  }
);
