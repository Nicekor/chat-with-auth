import React, { useState } from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Link,
  Button,
  makeStyles,
  useMediaQuery,
  Typography,
  Box,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    input: {
      color: theme.palette.text.primary,
    },
    inputLabel: {
      color: theme.palette.primary.main,
    },
    formHelperText: {
      color: theme.palette.primary.main,
    },
    wrapper: {
      display: 'flex',
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1em',
      padding: '1em',
    },
    logInForm: {
      margin: 'auto 1em',
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      marginBottom: '1em',
    },
    loginBtn: {
      margin: '1em 0',
    },
    forgotPassword: {
      alignSelf: 'flex-start',
    },
  };
});

const LogInForm = () => {
  const minWidth768 = useMediaQuery('(min-width:768px)');
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState(
    "We'll never share your email."
  );
  const [password, setPassword] = useState('');
  const [emptyPassword, setEmptyPassword] = useState(false);

  const isValidEmail = (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const validateEmail = () => {
    if (!email) {
      setIsEmailInvalid(true);
      setEmailHelperText('This is a required field.');
    } else if (!isValidEmail(email)) {
      setIsEmailInvalid(true);
      setEmailHelperText('Not a well formed email address');
    } else {
      setIsEmailInvalid(false);
      setEmailHelperText("We'll never share your email.");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setEmptyPassword(true);
    } else {
      setEmptyPassword(false);
    }
  };

  const onLogInSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
  };

  const onEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const onPasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const onRegisterOption = () => {};

  return (
    <Box className={classes.wrapper}>
      <form
        onSubmit={onLogInSubmit}
        noValidate
        autoComplete="off"
        className={classes.logInForm}
        spellCheck={false}
      >
        <FormControl
          required
          error={isEmailInvalid}
          color="primary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="email" className={classes.inputLabel}>
            Email address
          </InputLabel>
          <Input
            id="email"
            type="email"
            autoFocus
            onChange={onEmailChange}
            aria-describedby="email-helper-text"
            className={classes.input}
          />
          <FormHelperText
            id="email-helper-text"
            className={classes.formHelperText}
          >
            {emailHelperText}
          </FormHelperText>
        </FormControl>
        <FormControl
          required
          error={emptyPassword}
          color="primary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="password" className={classes.inputLabel}>
            Password
          </InputLabel>
          <Input
            id="password"
            type="password"
            onChange={onPasswordChange}
            aria-describedby="password-helper-text"
            className={classes.input}
          />
          <FormHelperText
            id="password-helper-text"
            className={classes.formHelperText}
          >
            {emptyPassword
              ? 'This is a required field'
              : 'Do not share your password.'}
          </FormHelperText>
        </FormControl>
        <Link
          variant="body2"
          component="button"
          color="textPrimary"
          className={classes.forgotPassword}
          type="button"
        >
          Forgot your password?
        </Link>
        <Button type="submit" color="primary">
          Login
        </Button>
        <Typography variant="body2" align="center" color="textPrimary">
          OR
        </Typography>
        <Button color="primary">Enter without an account</Button>
        <FormHelperText className={classes.formHelperText}>
          Need an account?{' '}
          <Link
            variant="caption"
            component="button"
            color="textPrimary"
            onClick={onRegisterOption}
            type="button"
          >
            Register
          </Link>
        </FormHelperText>
      </form>
      {minWidth768 && (
        <>
          <Divider orientation="vertical" flexItem />
          <img
            src="https://d26a57ydsghvgx.cloudfront.net/content/blog/BlogImage_Chat.jpg"
            alt="Person chatting"
            style={{
              borderRadius: '1em',
              width: '30em',
              margin: '1em',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default LogInForm;
