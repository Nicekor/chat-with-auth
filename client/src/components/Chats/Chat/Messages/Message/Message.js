import React, { useContext, useEffect, useState } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import { AddresseesContext } from '../../../../../context/Addressees';
import AvatarWithLetter from '../../../../UI/AvatarWithLetter/AvatarWithLetter';

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

const Message = ({ id, message, seen, createdAt, addresseeIndex }) => {
  const classes = useStyles();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { addressees } = useContext(AddresseesContext);
  const addresseeName = [
    addressees[addresseeIndex].firstName,
    addressees[addresseeIndex].lastName,
  ].join(' ');

  useEffect(() => {
    if (id === 21 || id === 15) {
      setIsCurrentUser(true);
    }
  }, [id]);

  return (
    <ListItem
      className={[
        classes.messageWrapper,
        isCurrentUser ? classes.currentUserMessageWrapper : null,
      ].join(' ')}
    >
      {!isCurrentUser && (
        <ListItemAvatar>
          <AvatarWithLetter
            alt={addresseeName}
            src={addressees[addresseeIndex].avatar}
            personName={addresseeName}
          />
        </ListItemAvatar>
      )}
      <ListItemText secondary={message} />
    </ListItem>
  );
};

export default Message;
