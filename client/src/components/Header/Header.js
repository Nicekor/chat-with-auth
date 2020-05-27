import React from 'react';

import classes from './Header.module.css';
import sunIcon from '../../assets/img/sun-icon.png';
import moonIcon from '../../assets/img/moon-icon.png';

import Switch from '@material-ui/core/Switch';

const Header = ({ darkMode, setDarkMode }) => {
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
