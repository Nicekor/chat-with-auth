import React, { useContext, useState } from 'react';
import {
  TextField,
  makeStyles,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { SocketContext } from '../../../../context/SocketCtx';

const useStyles = makeStyles((theme) => {
  return {
    inputMessage: {
      position: 'sticky',
      bottom: 0,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1, 0),
    },
  };
});

const InputMessage = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);

  const onMessageChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  };

  return (
    <TextField
      placeholder="Type a message..."
      fullWidth
      className={classes.inputMessage}
      onChange={(e) => onMessageChange(e)}
      onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
      value={message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={(e) => sendMessage(e)}>
              <Send />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputMessage;
