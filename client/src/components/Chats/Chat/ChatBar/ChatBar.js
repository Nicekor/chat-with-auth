import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const ChatBar = ({ name, avatar }) => {
  const classes = useStyles();

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
          {name}
        </Typography>

        <Avatar
          alt={name + ' avatar'}
          src={`http://192.168.1.157:5000/avatars/${avatar}`}
        >
          {name ? name.charAt(0) : null}
        </Avatar>
      </Box>
    </Box>
  );
};

export default ChatBar;
