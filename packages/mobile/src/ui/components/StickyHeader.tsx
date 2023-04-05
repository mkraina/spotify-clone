import { ScrollViewProps, StickyHeaderComponentProps } from 'react-native';
//@ts-expect-error unable to create definition
import ScrollViewStickyHeader from 'react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader';

export const StickyHeader: React.FC<StickyHeaderComponentProps> = ScrollViewStickyHeader;

const stickyHeaderIndices = [0];
export const useStickyHeaderProps = (
  component: React.FC<StickyHeaderComponentProps>
): Pick<ScrollViewProps, 'StickyHeaderComponent' | 'stickyHeaderIndices'> => {
  return { stickyHeaderIndices, StickyHeaderComponent: component };
};
