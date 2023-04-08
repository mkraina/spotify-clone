import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '@spotify-clone/shared/ui';
import { Category } from 'spotify-types';

import { Skeleton, StyleSheet, Text, TouchableRipple } from '../../ui';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: spacing(0.5),
    padding: spacing(),
    aspectRatio: 1,
    backgroundColor: 'silver',
  },
});

type Props = { category: Category; style?: StyleProp<ViewStyle> };

const Card = React.memo<Props>(({ category, style }) => {
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
        <Text fontWeight="bold">{category.name}</Text>
      </>
    </TouchableRipple>
  );
});

export const CategoryCard = Object.assign(Card, {
  Placeholder: (props: Pick<Props, 'style'>) => {
    return (
      <Skeleton>
        <View style={[styles.container, props.style]} />
      </Skeleton>
    );
  },
});
