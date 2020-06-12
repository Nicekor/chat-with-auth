import React from 'react';
import {
  Box,
  TextField,
  makeStyles,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    nicknameWrapper: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    nickname: {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  };
});

const EnterNickname = () => {
  const classes = useStyles();
  return (
    <Box className={classes.nicknameWrapper}>
      <TextField
        variant="filled"
        label="Nickname"
        color="primary"
        className={classes.nickname}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EditOutlined color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary">
        LET'S GO
      </Button>
    </Box>
  );
};

export default EnterNickname;
