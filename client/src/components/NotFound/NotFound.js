import React from 'react';

import helpIcon from '../../assets/img/help-icon.png';
import { Typography, makeStyles, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: 'auto',
    },
  };
});

const NotFound = () => {
  const minWidth768 = useMediaQuery('(min-width:768px)');
  const classes = useStyles();

  return (
    <div
      className={classes.wrapper}
      style={{ flexDirection: minWidth768 ? '' : 'column' }}
    >
      <img src={helpIcon} alt="Question Mark Cat" />
      <Typography variant="h2" align="center">
        Page Not Found
      </Typography>
    </div>
  );
};

export default NotFound;
