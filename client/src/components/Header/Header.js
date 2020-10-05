import React, { useCallback, useEffect, useState } from 'react';
import {
  Brightness5Outlined,
  ExitToApp,
  NightsStayOutlined,
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
} from '@material-ui/core';

import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import AvatarWithLetter from '../UI/AvatarWithLetter/AvatarWithLetter';
import UploadAvatarDialog from '../UI/UploadAvatarDialog/UploadAvatarDialog';

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
  const [firstName, setFirstName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  const getUsername = useCallback(async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/name/firstName',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const firstName = await res.json();
      setFirstName(firstName);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getAvatar = useCallback(async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/attachment/avatar',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const avatarBlob = await res.blob();
      setAvatar(URL.createObjectURL(avatarBlob));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!firstName) {
      getUsername();
    }
  }, [getUsername, firstName]);

  useEffect(() => {
    if (!avatar) {
      getAvatar();
    }
  }, [getAvatar, avatar]);

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onAvatarDialogOpen = () => {
    setOpenAvatarDialog(true);
  };

  const onAvatarDialogClose = () => {
    setOpenAvatarDialog(false);
  };

  const onAvatarUploaded = useCallback((avatarBlob) => {
    if (avatarBlob) {
      setAvatar(URL.createObjectURL(avatarBlob));
      setOpenAvatarDialog(false);
    }
  }, []);

  const onLogOutClick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    history.replace('/');
  };

  return (
    <header className={classes.header}>
      {isAuthenticated && (
        <>
          <IconButton
            color="primary"
            aria-controls="settings-menu"
            aria-haspopup="true"
            edge="start"
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
          >
            <AvatarWithLetter
              alt={firstName}
              src={avatar}
              personName={firstName}
            />
          </IconButton>
          <Typography variant="h5">Chats</Typography>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
            <MenuItem>
              <PersonAdd className={classes.menuIcon} />
              <Typography>Add Friend</Typography>
            </MenuItem>

            <MenuItem onClick={onAvatarDialogOpen}>
              <PhotoCamera className={classes.menuIcon} />
              <Typography>Upload Avatar</Typography>
            </MenuItem>
            <UploadAvatarDialog
              open={openAvatarDialog}
              handleClose={onAvatarDialogClose}
              handleAvatarUploaded={onAvatarUploaded}
            />

            <MenuItem onClick={onLogOutClick}>
              <ExitToApp className={classes.menuIcon} />
              <Typography>Log Out</Typography>
            </MenuItem>
          </Menu>
        </>
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
