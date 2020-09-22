import React, { useState, useEffect } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    messageWrapper: {
      width: 'fit-content',
      maxWidth: '50%',
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(2),
    },
  };
});

const Message = ({ message: { id, message } }) => {
  const classes = useStyles();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (id === 21) {
      setIsCurrentUser(true); 
    }
  }, [id]);

  return (
    <>
      <ListItem
        className={classes.messageWrapper}
        style={isCurrentUser ? { marginLeft: 'auto' } : null}
      >
        {!isCurrentUser && (
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        )}
        <ListItemText secondary={message} />
      </ListItem>
    </>
  );
};

export default Message;
