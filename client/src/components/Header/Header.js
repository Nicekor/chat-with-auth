import React from 'react';

import sunIcon from '../../assets/img/sun-icon.png';
import moonIcon from '../../assets/img/moon-icon.png';

import { makeStyles, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    sunIcon: {
      width: '2em',
    },
    moonIcon: {
      width: '3em',
    },
  };
});

const Header = ({ darkMode, setDarkMode }) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <img src={sunIcon} alt="Sun Icon" className={classes.sunIcon} />
      <Switch
        color="secondary"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <img src={moonIcon} alt="Moon Icon" className={classes.moonIcon} />
    </header>
  );
};

export default Header;
