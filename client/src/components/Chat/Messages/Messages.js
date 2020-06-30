import React from 'react';
import { List, makeStyles, Paper } from '@material-ui/core';
import Message from './Message/Message';
import Scrollbar from '../../UI/Scrollbar/Scrollbar';
import { messages } from '../../../utils/dummyData';

const useStyles = makeStyles((theme) => {
  return {
    messagesWrapper: {
      width: '100%',
      height: `calc(100vh - ${theme.measures.headerMaxHeight})`,
      overflow: 'auto',
      backgroundColor: theme.palette.background.default,
    },
  };
});

const Messages = () => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.messagesWrapper}>
      <Scrollbar scrollToBottom>
        <List>
          {messages.map(({ id, message }) => {
            return <Message key={id} message={{ id, message }} />;
          })}
        </List>
      </Scrollbar>
    </Paper>
  );
};

export default Messages;
