import React from 'react';
import { List } from '@material-ui/core';

import { messages } from '../../../../utils/dummyData';
import Message from './Message/Message';

const Messages = ({ addresseeIndex }) => {
  return (
    <List>
      {messages.map(({ id, message, seen, createdAt }) => (
        <Message
          key={id}
          id={id}
          message={message}
          seen={seen}
          createdAt={createdAt}
          addresseeIndex={addresseeIndex}
        />
      ))}
    </List>
  );
};

export default Messages;
