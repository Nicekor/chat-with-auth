import React, { useState } from 'react';
import {
  Brightness5Outlined,
  NightsStayOutlined,
  PersonAdd,
  Settings,
} from '@material-ui/icons';
import {
  makeStyles,
  Switch,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';

import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      height: theme.measures.header.height,
      padding: theme.spacing(0, 2),
    },
  };
});

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

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
            <Settings />
          </IconButton>
          <IconButton color="primary">
            <PersonAdd />
          </IconButton>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
            <MenuItem onClick={onLogOutClick}>Log Out</MenuItem>
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
