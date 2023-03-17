import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Root = styled.div({ position: 'relative' });
const Wrapper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '& > *': { height: '100%', width: '100%' },
});
const Padding = styled.div<{ ratio: number }>(({ ratio }) => ({
  paddingBottom: `${(1 / ratio) * 100}%`,
}));

export const AspectRatio: React.FC<PropsWithChildren & { ratio?: number }> = ({
  children,
  ratio = 1,
}) => {
  return (
    <Root className="root">
      <Wrapper className="wrapper">{children}</Wrapper>
      <Padding ratio={ratio} />
    </Root>
  );
};
