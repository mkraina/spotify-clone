import React from 'react';
import materialCommunityIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import materialIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import { IconProps } from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type IconName = keyof (typeof materialIconsGlyphMap & typeof materialCommunityIconsGlyphMap);

export const Icon = React.memo<IconProps & { name: IconName }>(props => {
  if (props.name in materialIconsGlyphMap) {
    return <MaterialIcons {...props} />;
  }
  return <MaterialCommunityIcons {...props} />;
});
