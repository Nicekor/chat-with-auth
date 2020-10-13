import React, { useEffect, useState } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    messageWrapper: {
      width: 'fit-content',
      maxWidth: '80%',
      borderRadius: theme.spacing(0, 1, 1, 1),
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(1, 0),
      overflowWrap: 'break-word',
    },
    currentUserMessageWrapper: {
      marginLeft: 'auto',
      borderRadius: theme.spacing(1, 0, 1, 1),
    },
  };
});

const Message = ({ addresseeState, author, message }) => {
  const classes = useStyles();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const {
    id: addresseeId,
    name: addresseName,
    avatar: addresseeAvatar,
  } = addresseeState;

  useEffect(() => {
    setIsCurrentUser(author !== addresseeId);
  }, [addresseeId, author]);

  return (
    <ListItem
      className={[
        classes.messageWrapper,
        isCurrentUser ? classes.currentUserMessageWrapper : null,
      ].join(' ')}
    >
      {!isCurrentUser && (
        <ListItemAvatar>
          <Avatar
            alt={addresseName + ' avatar'}
            src={`http://192.168.1.157:5000/avatars/${addresseeAvatar}`}
          >
            {addresseName ? addresseName.charAt(0) : null}
          </Avatar>
        </ListItemAvatar>
      )}
      <ListItemText secondary={message} />
    </ListItem>
  );
};

export default Message;
