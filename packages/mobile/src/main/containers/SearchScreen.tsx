import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchResult, useSearch } from '@spotify-clone/shared/api';
import { spacing } from '@spotify-clone/shared/ui';

import { AppScreenProps } from '../../navigation';
import { Appbar, SafeArea, StyleSheet, Text, TextInput, useStyles, useTheme } from '../../ui';
import { Screen } from '../components';

const themedStyles = StyleSheet.themed(({ colors }) => ({
  header: {
    backgroundColor: colors.elevation.level2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing(),
  },
  input: { flex: 1, padding: 0, backgroundColor: 'transparent' },
  inputContent: { paddingStart: 0 },
  inputUnderline: { height: 0 },
  chipsContainer: {
    backgroundColor: colors.background,
    borderBottomColor: colors.elevation.level1,
    borderBottomWidth: 1,
  },
  chipsContentContainer: { padding: spacing() },
  chip: { margin: spacing() },
  result: { height: 54 },
}));

type SectionData = NonNullable<SearchResult>['pages'][0];
const Section = React.memo<{
  data: SectionData;
  type: keyof SectionData;
}>(({ type, data }) => {
  const styles = useStyles(themedStyles);

  const items = type !== 'nextOffset' && data[type]?.items;

  if (!items) {
    return null;
  }
  return (
    <>
      <Text>{type}</Text>
      {items.map(i => (
        <Text style={styles.result} key={i.id}>
          {i.name}
        </Text>
      ))}
    </>
  );
});

const stickyHeaderIndices = [0];
export const SearchScreen = React.memo<AppScreenProps<'search'>>(
  ({ route: { params = {} }, navigation: { setParams } }) => {
    const search = useSearch({ q: params.query });
    const { t } = useTranslation();
    const styles = useStyles(themedStyles);
    const theme = useTheme();

    const page = search.data?.pages[0];

    return (
      <>
        <SafeArea.Top />
        <Appbar>
          <Appbar.BackAction />
          <TextInput
            style={styles.input}
            underlineStyle={styles.inputUnderline}
            contentStyle={styles.inputContent}
            autoCorrect={false}
            placeholderTextColor={theme.colors.outline}
            value={params.query}
            placeholder={t('searchInputPlaceholder')}
            onChangeText={useCallback((val: string) => setParams({ query: val }), [setParams])}
          />
        </Appbar>
        <Screen
          stickyHeaderIndices={stickyHeaderIndices}
          stickyHeaderHiddenOnScroll
          bounces={false}
        >
          {page &&
            Object.keys(page).map(key => (
              <Section key={key} data={page} type={key as keyof SectionData} />
            ))}
        </Screen>
      </>
    );
  }
);
