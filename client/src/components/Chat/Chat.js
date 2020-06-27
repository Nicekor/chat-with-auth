import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import Messages from './Messages/Messages';
import Addressees from './Addressees/Addressees';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      display: 'flex',
    },
  };
});

const Chat = () => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  return (
    <Box className={classes.wrapper}>
      <Addressees />
      <Messages />
      {/* add textfield */}
    </Box>
  );
};

export default Chat;
