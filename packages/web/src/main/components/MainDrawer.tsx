import React from 'react';
import { useTranslation } from 'react-i18next';
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Home from '@mui/icons-material/Home';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import Search from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { useUserTop } from '@spotify-clone/shared/api';
import { TranslationKey } from '@spotify-clone/shared/i18n';
import { ScreenName } from '@spotify-clone/shared/navigation';
import { spacing } from '@spotify-clone/shared/ui';
import styled, { useTheme } from 'styled-components';

import { routes, usePathName } from '../../navigation';

const getShade = (active: boolean) => (active ? 100 : 400);

const ItemWrapper = styled.div<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.background.default : undefined,
  color: theme.palette.grey[getShade(active)],
  fontWeight: active ? 'bolder' : 'normal',
}));
const Space = styled.div<{ size: number }>(({ size }) => ({ height: spacing(size) }));

const icons: Partial<Record<ScreenName, typeof SvgIcon>> = {
  home: HomeOutlined,
  search: Search,
  collection: BookmarkBorderIcon,
};
const activeIcons: typeof icons = { home: Home, collection: Bookmark };
const labelKeys: Partial<Record<ScreenName, TranslationKey>> = {
  home: 'mainNavigatorBarHome',
  search: 'mainNavigatorBarSearch',
  collection: 'mainNavigatorBarCollections',
};

const Item: React.FC<{
  children: string;
  href: string;
  Icon?: typeof SvgIcon;
  active?: boolean;
}> = ({ children, href, active = false, Icon }) => {
  const { palette } = useTheme();
  return (
    <ItemWrapper active={active}>
      <ListItemButton href={href}>
        {Icon && (
          <ListItemIcon>
            <Icon fontSize="large" htmlColor={palette.grey[getShade(active)]} />
          </ListItemIcon>
        )}
        <ListItemText disableTypography>{children}</ListItemText>
      </ListItemButton>
    </ItemWrapper>
  );
};

const RouteItem: React.FC<{ pathName: ScreenName; route: string }> = props => {
  const { t } = useTranslation();
  const currentPath = usePathName();
  const active = currentPath === props.pathName;
  const Icon = (active && activeIcons[props.pathName]) || icons[props.pathName];
  const labelKey = labelKeys[props.pathName];
  if (!labelKey) return null;
  return (
    <Item Icon={Icon} active={active} href={props.route}>
      {t(labelKey)}
    </Item>
  );
};

const ArtistsList: React.FC = () => {
  const topArtists = useUserTop('artists', 'short_term');
  return (
    <>
      {topArtists.data?.items.map(a => (
        <Item key={a.id} href={routes.artist({ id: a.id })}>
          {a.name}
        </Item>
      ))}
    </>
  );
};

export const MainDrawer: React.FC = () => {
  return (
    <Drawer anchor="left" variant="permanent">
      <List disablePadding>
        <Toolbar />
        <RouteItem pathName="home" route={routes.home} />
        <RouteItem pathName="search" route={routes.search({})} />
        <RouteItem pathName="collection" route={routes.collection({})} />
        <Space size={4} />
        <Divider />
        <Space size={4} />
        <ArtistsList />
      </List>
    </Drawer>
  );
};
