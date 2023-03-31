import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import materialCommunityIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import materialIconsGlyphMap from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ColorKey } from '../hooks';

import { Touchable } from './Touchable';

export type IconName = keyof (typeof materialIconsGlyphMap & typeof materialCommunityIconsGlyphMap);
export type IconProps = Omit<VectorIconProps, 'color'> & {
  name: IconName;
  color?: ColorKey;
  contentStyle?: StyleProp<ViewStyle>;
};
const IconBase = React.memo<VectorIconProps>(props => {
  if (props.name in materialIconsGlyphMap) {
    return <MaterialIcons {...props} />;
  }
  return <MaterialCommunityIcons {...props} />;
});
export const Icon = React.memo<IconProps>(
  ({ onPress, color = 'onBackground', size = 24, style, contentStyle, ...iconProps }) => {
    const finalColor = useTheme().colors[color];
    return (
      <Touchable color={color} onPress={onPress} style={style}>
        <IconBase {...iconProps} color={finalColor} size={size} style={contentStyle} />
      </Touchable>
    );
  }
);
