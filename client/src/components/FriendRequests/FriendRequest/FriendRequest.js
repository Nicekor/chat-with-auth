import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { CancelOutlined, CheckCircleOutlined } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => {
  return {
    item: {
      padding: 'inherit',
    },
    cancelIcon: {
      color: theme.palette.error.main,
    },
    acceptIcon: {
      color: theme.palette.success.main,
    },
  };
});

const FriendRequest = ({
  avatar,
  name,
  requesterFriendTag,
  recipientFriendTag,
  setFriendRequests,
  onFriendRequestAction,
}) => {
  const classes = useStyles();

  const onCancelFriendRequest = async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/friend-request',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requester: requesterFriendTag }),
        }
      );
      if (res.ok) {
        setFriendRequests((friendRequests) =>
          friendRequests.filter(
            (friendRequest) =>
              friendRequest.requesterFriendTag !== requesterFriendTag &&
              friendRequest.recipientFriendTag !== recipientFriendTag
          )
        );
        onFriendRequestAction('rejected', name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onAcceptFriendRequest = async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/friend-request',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requester: requesterFriendTag }),
        }
      );
      if (res.ok) {
        setFriendRequests((friendRequests) => {
          return friendRequests.map(({ accepted, ...friendRequestData }) => {
            return {
              accepted: true,
              ...friendRequestData,
            };
          });
        });
        onFriendRequestAction('accepted', name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ListItem className={classes.item}>
      <ListItemAvatar>
        <Avatar
          alt={name + ' avatar'}
          src={`http://192.168.1.157:5000/avatars/${avatar}`}
        >
          {name ? name.charAt(0) : null}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton
          className={classes.cancelIcon}
          edge="start"
          onClick={onCancelFriendRequest}
        >
          <CancelOutlined fontSize="large" />
        </IconButton>
        <IconButton
          className={classes.acceptIcon}
          edge="end"
          onClick={onAcceptFriendRequest}
        >
          <CheckCircleOutlined fontSize="large" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FriendRequest;
