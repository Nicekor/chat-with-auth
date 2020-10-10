import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  makeStyles,
  Snackbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FriendRequestsBar from './FriendRequestsBar/FriendRequestsBar';
import FriendRequest from './FriendRequest/FriendRequest';
import { Save } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    friendTagHead: {
      marginRight: theme.spacing(1),
    },
    friendTagInput: {
      border: 'none',
      background: 'none',
      outline: 'none',
      color: theme.palette.text.primary,
    },
  };
});

const FriendRequests = () => {
  const classes = useStyles();
  const [userFriendTag, setUserFriendTag] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const friendTagRef = useRef();
  const [friendTagSelected, setFriendTagSelected] = useState(false);
  const [userFriendTagLoaded, setUserFriendTagLoaded] = useState(false);
  const [friendRequestsLoaded, setFriendRequestsLoaded] = useState(false);
  const [friendRequestResult, setFriendRequestResult] = useState(null);

  const loadUserFriendTag = useCallback(async () => {
    try {
      const res = await fetch('http://192.168.1.157:5000/api/user/friend-tag', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserFriendTag(await res.json());
    } catch (err) {
      console.error(err);
    }
    setUserFriendTagLoaded(true);
  }, []);

  const loadFriendRequests = useCallback(async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/friend-requests',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFriendRequests(await res.json());
    } catch (err) {
      console.error(err);
    }
    setFriendRequestsLoaded(true);
  }, []);

  useEffect(() => {
    loadUserFriendTag();
    loadFriendRequests();
  }, [loadUserFriendTag, loadFriendRequests]);

  const onSaveClick = (e) => {
    friendTagRef.current.select();
    friendTagRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
    setFriendTagSelected(true);
  };

  const handleFriendTagSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setFriendTagSelected(false);
  };

  const handleFriendRequestSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setFriendRequestResult(null);
  };

  // action can be either 'rejected' or 'accepted'
  const handleFriendRequestAction = (action, name) => {
    setFriendRequestResult({ action, name });
  };

  if (!userFriendTagLoaded || !friendRequestsLoaded)
    return <CircularProgress style={{ margin: 'auto' }} />;
  return (
    <Box mx={2}>
      <FriendRequestsBar />
      <Box display="flex" alignItems="center">
        <Typography variant="h6" className={classes.friendTagHead}>
          Your Friend Tag:
        </Typography>
        <Typography
          readOnly
          variant="body1"
          component="input"
          type="text"
          ref={friendTagRef}
          className={classes.friendTagInput}
          value={userFriendTag}
          size={userFriendTag.length}
        />
        <Tooltip title="Copy" onClick={onSaveClick} color="secondary">
          <IconButton aria-label="copy" edge="end">
            <Save />
          </IconButton>
        </Tooltip>
      </Box>
      {friendRequests && (
        <List>
          {friendRequests.map(
            ({ friendRequestId, accepted, ...friendRequestData }) =>
              !accepted && (
                <FriendRequest
                  key={friendRequestId}
                  accepted={accepted}
                  setFriendRequests={setFriendRequests}
                  onFriendRequestAction={handleFriendRequestAction}
                  {...friendRequestData}
                />
              )
          )}
        </List>
      )}

      <Snackbar
        open={friendTagSelected}
        autoHideDuration={2000}
        onClose={handleFriendTagSnackbarClose}
      >
        <Alert
          onClose={handleFriendTagSnackbarClose}
          elevation={6}
          variant="filled"
          severity="success"
        >
          Friend Tag copied to your clipboard!
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(friendRequestResult)}
        autoHideDuration={2000}
        onClose={handleFriendRequestSnackbarClose}
      >
        <Alert
          onClose={handleFriendRequestSnackbarClose}
          elevation={6}
          variant="filled"
          severity="success"
        >
          {friendRequestResult &&
            (friendRequestResult.action === 'accepted'
              ? `You and ${friendRequestResult.name} are now friends!`
              : `${friendRequestResult.name} friend request rejected!`)}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FriendRequests;
