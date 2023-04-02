import { Box, BoxProps } from '@mui/material';
import styled from 'styled-components';

const Wrapper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '& > *': { height: '100%', width: '100%' },
});

export const AspectRatio: React.FC<BoxProps & { ratio?: number }> = ({
  children,
  ratio = 1,
  ...props
}) => {
  return (
    <Box {...props} position="relative">
      <Wrapper>{children}</Wrapper>
      <Box paddingBottom={`${(1 / ratio) * 100}%`} />
    </Box>
  );
};
