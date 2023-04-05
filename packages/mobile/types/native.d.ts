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
}
