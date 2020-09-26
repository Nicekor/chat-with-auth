import React from 'react';

import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';

import { makeStyles, Switch, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      height: theme.measures.header.height,
    },
  };
});

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Box display="flex" alignItems="center" marginLeft="auto">
        <Brightness5OutlinedIcon />
        <Switch
          color="primary"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <NightsStayOutlinedIcon />
      </Box>
    </header>
  );
};

export default Header;
