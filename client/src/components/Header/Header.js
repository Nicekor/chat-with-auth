import React, { useState } from 'react';
import {
  Brightness5Outlined,
  ExitToApp,
  NightsStayOutlined,
  People,
  PersonAdd,
  PhotoCamera,
} from '@material-ui/icons';
import {
  makeStyles,
  Switch,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from '@material-ui/core';

import useAuth from '../../hooks/useAuth';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import UploadAvatarDialog from './UploadAvatarDialog/UploadAvatarDialog';
import UserAvatar from '../UI/UserAvatar/UserAvatar';
import UserAvatarProvider from '../../context/UserAvatarCtx';
import AddFriendDialog from './AddFriendDialog/AddFriendDialog';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      height: theme.measures.header.height,
      padding: theme.spacing(0, 2),
    },
    menuIcon: {
      marginRight: theme.spacing(1),
    },
  };
});

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onAvatarDialogOpen = () => {
    setOpenAvatarDialog(true);
  };

  const onAddFriend = () => {
    setOpenAddFriendDialog(true);
  };

  const onAddFriendDialogClose = () => {
    setOpenAddFriendDialog(false);
  };

  const onAvatarDialogClose = () => {
    setOpenAvatarDialog(false);
  };

  const onLogOutClick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    history.replace('/');
  };

  return (
    <header className={classes.header}>
      {isAuthenticated && (
        <UserAvatarProvider>
          <Box display="flex" alignItems="center">
            <IconButton
              color="primary"
              aria-controls="settings-menu"
              aria-haspopup="true"
              edge="start"
              onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            >
              <UserAvatar />
            </IconButton>
            <Typography variant="h5">Chats</Typography>
          </Box>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
            <MenuItem component={RouterLink} to="/friend-requests">
              <Badge
                badgeContent={0}
                color="secondary"
                className={classes.menuIcon}
              >
                <People />
              </Badge>
              <Typography>Friend Requests</Typography>
            </MenuItem>

            <MenuItem onClick={onAddFriend}>
              <PersonAdd className={classes.menuIcon} />
              <Typography>Add Friend</Typography>
            </MenuItem>
            <AddFriendDialog
              open={openAddFriendDialog}
              handleClose={onAddFriendDialogClose}
            />

            <MenuItem onClick={onAvatarDialogOpen}>
              <PhotoCamera className={classes.menuIcon} />
              <Typography>Upload Avatar</Typography>
            </MenuItem>
            <UploadAvatarDialog
              open={openAvatarDialog}
              handleClose={onAvatarDialogClose}
            />

            <MenuItem onClick={onLogOutClick}>
              <ExitToApp className={classes.menuIcon} />
              <Typography>Log Out</Typography>
            </MenuItem>
          </Menu>
        </UserAvatarProvider>
      )}
      <Box display="flex" alignItems="center" marginLeft="auto">
        <Brightness5Outlined />
        <Switch
          color="primary"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <NightsStayOutlined />
      </Box>
    </header>
  );
};

export default Header;
