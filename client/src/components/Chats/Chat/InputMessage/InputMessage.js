import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

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

  return (
    <TextField
      placeholder="Type a message..."
      fullWidth
      className={classes.inputMessage}
    />
  );
};

export default InputMessage;
