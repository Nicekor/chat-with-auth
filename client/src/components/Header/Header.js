import React, { useEffect, useRef, useState } from 'react';
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
  Button,
} from '@material-ui/core';

import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import AvatarWithLetter from '../UI/AvatarWithLetter/AvatarWithLetter';
import AvatarUploader from '../UI/AvatarUploader/AvatarUploader';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      height: theme.measures.header.height,
      padding: theme.spacing(0, 2),
    },
    myAvatar: {
      marginLeft: theme.spacing(-1),
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
  const { state: userData } = useLocation();
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setUserId(userData.userId);
    }
  }, [userData]);

  const onMenuClose = () => {
    setAnchorEl(null);
  };

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
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
          >
            <AvatarWithLetter
              className={classes.myAvatar}
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
            <MenuItem onClick={() => {}}>
              <PersonAdd className={classes.menuIcon} />
              <Typography>Add Friend</Typography>
            </MenuItem>
            <MenuItem>
              <PhotoCamera className={classes.menuIcon} />
              <AvatarUploader />
            </MenuItem>
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
