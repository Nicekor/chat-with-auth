import React from 'react';
import { TextField, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  const margin = theme.spacing(1);
  return {
    inputWrapper: {
      backgroundColor: theme.palette.background.default,
    },
    inputMessage: {
      margin,
      width: `calc(100% - ${margin * 2}px)`,
      height: `calc((${theme.measures.bodyHeight} - 88vh) - ${margin * 2}px)`,
    },
  };
});

const InputMessage = () => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.inputWrapper}>
      <TextField
        placeholder="Type a message..."
        variant="standard"
        className={classes.inputMessage}
      />
    </Paper>
  );
};

export default InputMessage;
