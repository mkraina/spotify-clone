import { Box, Card, Typography } from '@mui/material';
import { Category } from 'spotify-types';
import styled from 'styled-components';

import { routes } from '../../navigation';
import { AspectRatio } from '../../ui';

const Image = styled.img({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});
const Container = styled(Card)({
  transition: 'transform 0.5s',
  ':hover': { transform: 'scale(1.05)' },
}) as typeof Card;

const Hover = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
  transition: 'opacity 1s',
  opacity: 0,
  ':hover': { opacity: 0.1 },
}));

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <AspectRatio flex={1} padding={1}>
      <Container component="a" elevation={16} href={routes.category(category)}>
        <Image src={category.icons[0]?.url} />
        <Box bottom={0} left={0} padding={1} position="absolute" right={0} top={0}>
          <Hover bottom={0} left={0} position="absolute" right={0} top={0} />
          <Typography variant="h6">{category.name}</Typography>
        </Box>
      </Container>
    </AspectRatio>
  );
};
