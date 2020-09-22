import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import Messages from './Messages/Messages';
import Addressees from './Addressees/Addressees';
import InputMessage from './InputMessage/InputMessage';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      display: 'flex',
      height: theme.measures.bodyHeight,
    },
    inputMessagePaper: {
      backgroundColor: theme.palette.background.default,
    },
  };
});

const Chat = () => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  // to make it easier to debug, and see what is going on with the dimensions, make width and height props of each component in here
  // try removing paper over messages as well, see how it looks
  return (
    <Box className={classes.wrapper}>
      <Addressees width="50%" />
      <Box width="100%">
        <Messages />
        <InputMessage />
      </Box>
    </Box>
  );
};

export default Chat;
