import { Box, BoxProps } from '@mui/material';
import { useElementSize } from 'usehooks-ts';

export const AspectRatio: React.FC<BoxProps & { ratio?: number }> = ({
  ratio = 1,
  width,
  height,
  ...props
}) => {
  const [ref, size] = useElementSize();

  return (
    <Box
      ref={ref}
      position="relative"
      {...props}
      height={height ?? ratio * size.width}
      width={width ?? ratio * size.height}
    />
  );
};
