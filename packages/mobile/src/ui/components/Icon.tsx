import React from 'react';
import materialCommunityIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import materialIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ColorKey, useColor } from '../hooks';

export type IconName = keyof (typeof materialIconsGlyphMap & typeof materialCommunityIconsGlyphMap);
export type IconProps = Omit<VectorIconProps, 'color'> & {
  name: IconName;
  color?: ColorKey;
};
const IconBase = React.memo<VectorIconProps>(props => {
  if (props.name in materialIconsGlyphMap) {
    return <MaterialIcons {...props} />;
  }
  return <MaterialCommunityIcons {...props} />;
});

export const Icon = React.memo<IconProps>(({ color = 'onBackground', size = 24, ...iconProps }) => {
  const finalColor = useColor(color);
  return <IconBase {...iconProps} color={finalColor} size={size} />;
});
