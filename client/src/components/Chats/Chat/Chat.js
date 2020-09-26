import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import ChatBar from './ChatBar/ChatBar';
import Messages from './Messages/Messages';
import InputMessage from './InputMessage/InputMessage';
import AddresseesProvider from '../../../context/Addressees';

const Chat = ({ match }) => {
  // const chatId = match.params.chatId;
  const { state } = useLocation();
  const { addresseeIndex } = state;
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box mx={2}>
      <AddresseesProvider>
        <ChatBar addresseeIndex={addresseeIndex} />
        <Messages addresseeIndex={addresseeIndex} />
      </AddresseesProvider>
      <div ref={messagesEndRef}></div>
      <InputMessage />
    </Box>
  );
};

export default Chat;
