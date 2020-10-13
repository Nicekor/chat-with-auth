import React, { useContext, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import ChatBar from './ChatBar/ChatBar';
import Messages from './Messages/Messages';
import InputMessage from './InputMessage/InputMessage';
import { SocketContext } from '../../../context/SocketCtx';

const useStyles = makeStyles((theme) => {
  return {
    messagesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      flex: 1,
    },
  };
});

const Chat = () => {
  const classes = useStyles();
  const { state: addresseeState } = useLocation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('joinRoom', addresseeState.id);

    return () => {
      socket.emit('leaveRoom', addresseeState.id);
    };
  }, [socket, addresseeState.id]);

  return (
    <Box mx={2} display="flex" flexDirection="column" flex={1}>
      <ChatBar {...addresseeState} />
      <Messages
        className={classes.messagesWrapper}
        addresseeState={addresseeState}
      />
      <InputMessage />
    </Box>
  );
};

export default Chat;
