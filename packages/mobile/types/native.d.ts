import 'react-native';

declare module 'react-native' {
  export type StickyHeaderComponentProps = {
    /**
     *  Will cause sticky headers to stick at the bottom of the ScrollView instead of the top.
     */
    inverted: boolean | null;
    nextHeaderLayoutY: number | null;
    onLayout: (event: LayoutChangeEvent) => void;
    scrollAnimatedValue: Animated.Value;
    /**
     * The height of the parent ScrollView. Currently only set when inverted.
     */
    scrollViewHeight: number | null;
    children?: React.ReactElement;
    hiddenOnScroll?: boolean | null;
    nativeID?: string | null;
  };
  export type SectionListRenderSectionHeader<T extends ItemT, S extends DefaultSectionT> = (info: {
    section: SectionListData<T, S>;
  }) => React.ReactElement | null;
  export type SectionListRenderSectionFooter<
    T extends ItemT,
    S extends DefaultSectionT
  > = SectionListRenderSectionHeader<T, S>;
  export type ListItemSeparatorComponentProps<T extends ItemT> = {
    highlighted: boolean;
    leadingItem: T;
  };
  export type ListItemSeparatorComponent<T extends ItemT> = React.ComponentType<
    ListItemSeparatorComponentProps<T>
  >;
  export type ViewabilityConfig = {
    /**
     * Similar to viewAreaCoveragePercentThreshold, but considers the percent of the item that is visible, rather than the fraction of the viewable area it covers.
     */
    itemVisiblePercentThreshold?: number;
    /**
     * Minimum amount of time (in milliseconds) that an item must be physically viewable before the viewability callback will be fired.
     * A high number means that scrolling through content without stopping will not mark the content as viewable.
     */
    minimumViewTime?: number;
    /**
     * Percent of viewport that must be covered for a partially occluded item to count as "viewable", 0-100.
     * Fully visible items are always considered viewable. A value of 0 means that a single pixel in the viewport makes the item viewable,
     * and a value of 100 means that an item must be either entirely visible or cover the entire viewport to count as viewable.
     */
    viewAreaCoveragePercentThreshold?: number;
    /**
     * Nothing is considered viewable until the user scrolls or recordInteraction is called after render.
     */
    waitForInteraction?: boolean;
  };
}
