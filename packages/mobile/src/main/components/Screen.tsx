import React, { PropsWithChildren, useMemo } from 'react';
import { Button, StyleProp, Text, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useIsFirstInStack } from '../../navigation';
import { SafeArea, StatusBar, StyleSheet } from '../../ui';

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignSelf: 'stretch', flexDirection: 'row' },
});

type Props = PropsWithChildren & {
  contentStyle?: StyleProp<ViewStyle>;
  showHeader?: boolean;
  title?: string;
};

export const Screen = React.memo<Props>(({ children, showHeader = true, title, contentStyle }) => {
  const hideBackButton = useIsFirstInStack();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      {showHeader && (
        <>
          <SafeArea.Top />
          <View style={styles.header}>
            {!hideBackButton && <Button onPress={goBack} title="go back" />}
            {!!title && <Text>{title}</Text>}
          </View>
        </>
      )}
      <View style={useMemo(() => [styles.container, contentStyle], [contentStyle])}>
        {children}
      </View>
    </View>
  );
});
