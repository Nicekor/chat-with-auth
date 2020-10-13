import React, { useContext, useEffect, useRef, useState } from 'react';
import { List } from '@material-ui/core';

import Message from './Message/Message';
import { SocketContext } from '../../../../context/SocketCtx';

const Messages = ({ className, addresseeState }) => {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef();

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <List className={className}>
      {messages.map(({ author, text }, index) => (
        <Message
          key={index}
          author={author}
          message={text}
          addresseeState={addresseeState}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </List>
  );
};

export default Messages;
