import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { Cancel, PersonAdd } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AddFriendDialog = ({ open, handleClose }) => {
  const [friendTag, setFriendTag] = useState('');
  const [error, setError] = useState(null);
  const [friendAdded, setFriendAdded] = useState(false);

  const onFriendTagChange = (e) => {
    setFriendTag(e.target.value);
  };

  const onAddFriend = async () => {
    try {
      const res = await fetch(
        'http://192.168.1.157:5000/api/user/friend-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ recipient: friendTag }),
        }
      );
      if (res.ok) {
        setError(null);
        setFriendAdded(true);
        handleClose();
        return;
      }
      const { error } = await res.json();
      setError(error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFriendAdded(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-friend-dialog"
      >
        <DialogTitle id="add-friend-dialog">Add a Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a friend please enter your friend's tag here. You can find
            your friend tag on the{' '}
            <Link component={RouterLink} color="secondary" to="friend-requests">
              Friends Request
            </Link>{' '}
            screen.
          </DialogContentText>
          <TextField
            onChange={onFriendTagChange}
            autoFocus
            error={Boolean(error)}
            margin="dense"
            id="friend-tag"
            label="Friend Tag"
            required
            fullWidth
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
          <Button
            onClick={onAddFriend}
            variant="outlined"
            color="primary"
            startIcon={<PersonAdd />}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={friendAdded}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          elevation={6}
          variant="filled"
          severity="success"
        >
          Friend successfully added!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddFriendDialog;
