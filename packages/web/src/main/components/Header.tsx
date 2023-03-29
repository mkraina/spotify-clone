import { PropsWithChildren } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useUserProfile } from '@spotify-clone/shared/api';
import styled from 'styled-components';

import { routes } from '../../navigation';

const UserThumbnailContainer = styled.div({ marginLeft: 'auto' });
const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
})) as typeof Chip;
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 1), //TODO: animate
}));

const UserThumbnail: React.FC = () => {
  const user = useUserProfile();
  if (!user.data) return null;
  return (
    <UserThumbnailContainer>
      <StyledChip
        avatar={<Avatar alt={user.data.display_name || undefined} src={user.data.images[0]?.url} />}
        clickable
        component="a"
        href={routes.account}
        label={user.data.display_name}
        variant="filled"
      />
    </UserThumbnailContainer>
  );
};

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledAppBar elevation={0} position="sticky">
      <Toolbar>
        {children}
        <UserThumbnail />
      </Toolbar>
    </StyledAppBar>
  );
};
