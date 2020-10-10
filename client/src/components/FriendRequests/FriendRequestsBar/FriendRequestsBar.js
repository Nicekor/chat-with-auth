import React from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    requestsAppBar: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1, 0),
    },
  };
});

const FriendRequestsBar = () => {
  const classes = useStyles();

  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top={0}
      zIndex="appBar"
      className={classes.requestsAppBar}
    >
      <RouterLink to="/chats">
        <IconButton edge="start" color="secondary">
          <ArrowBack />
        </IconButton>
      </RouterLink>

      <Typography variant="h5">Friend Requests</Typography>
    </Box>
  );
};

export default FriendRequestsBar;
