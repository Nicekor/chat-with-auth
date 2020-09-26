import React, { useContext } from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AddresseesContext } from '../../../../context/Addressees';

import AvatarWithLetter from '../../../UI/AvatarWithLetter/AvatarWithLetter';

const useStyles = makeStyles((theme) => {
  return {
    addresseeName: {
      marginRight: theme.spacing(2),
      fontWeight: theme.typography.fontWeightMedium,
    },
    chatAppBar: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1, 0),
    },
  };
});

const ChatBar = ({ addresseeIndex }) => {
  const classes = useStyles();
  const { addressees } = useContext(AddresseesContext);
  const addresseeName = [
    addressees[addresseeIndex].firstName,
    addressees[addresseeIndex].lastName,
  ].join(' ');

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top={0}
      zIndex="appBar"
      className={classes.chatAppBar}
    >
      <RouterLink to="/chats">
        <IconButton edge="start" color="secondary">
          <ArrowBackIcon />
        </IconButton>
      </RouterLink>
      <Box display="flex" alignItems="center">
        <Typography className={classes.addresseeName} noWrap>
          {addresseeName}
        </Typography>

        <AvatarWithLetter
          alt={addresseeName}
          src={addressees[addresseeIndex].avatar}
          personName={addresseeName}
        />
      </Box>
    </Box>
  );
};

export default ChatBar;
