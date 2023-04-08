import React, { useContext } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useLayout } from '@react-native-community/hooks';
import MaskedView from '@react-native-masked-view/masked-view';
import { Color, spacing } from '@spotify-clone/shared/ui';

import { StyleSheet, useTheme } from '../hooks';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'red',
    borderRadius: spacing(0.5),
  },
});

const SkeletonContext = React.createContext(false);

type WrappedComponentRef<T> = InstanceType<React.ComponentClass<T>>;
export const addBackgroundInSkeleton = <T extends ViewProps>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  WrappedComponent: React.ComponentClass<T> | React.FC<T>
) => {
  return React.forwardRef<WrappedComponentRef<T>, T>((props, ref) => {
    const isInsideSkeleton = useContext(SkeletonContext);
    if (isInsideSkeleton) {
      return (
        <WrappedComponent
          ref={ref}
          {...props}
          style={[styles.background, props.style as StyleProp<ViewStyle>]}
        />
      );
    }
    return <WrappedComponent ref={ref} {...props} />;
  });
};

export const Skeleton: React.FC<{
  children: React.ReactElement<ViewProps>;
}> = props => {
  const { colors, dark } = useTheme();
  const layout = useLayout();
  return (
    <SkeletonContext.Provider value={true}>
      <MaskedView
        maskElement={React.cloneElement(props.children, {
          onLayout: layout.onLayout,
        })}
      >
        <SkeletonContent
          duration={2000}
          isLoading
          boneColor={
            dark ? Color.lighten(colors.background, 0.05) : Color.darken(colors.background, 0.05)
          }
          highlightColor={
            dark ? Color.lighten(colors.background, 0.2) : Color.darken(colors.background, 0.2)
          }
          containerStyle={layout}
        >
          <View style={layout} />
        </SkeletonContent>
      </MaskedView>
    </SkeletonContext.Provider>
  );
};
