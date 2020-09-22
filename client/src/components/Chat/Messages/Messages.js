import React, { useState } from 'react';
import { List, makeStyles } from '@material-ui/core';
import Message from './Message/Message';
import Scrollbar from '../../UI/Scrollbar/Scrollbar';
import { messages } from '../../../utils/dummyData';

const useStyles = makeStyles((theme) => {
  return {
    messagesWrapper: {
      height: '88vh',
      overflow: 'auto',
      backgroundColor: theme.palette.background.default,
    },
  };
});

const Messages = () => {
  const classes = useStyles();
  const [myMessages] = useState(messages);

  return (
    <div className={classes.messagesWrapper}>
      <Scrollbar scrollToBottom>
        <List>
          {myMessages.map(({ id, message }) => {
            return <Message key={id} message={{ id, message }} />;
          })}
        </List>
      </Scrollbar>
    </div>
  );
};

export default Messages;
