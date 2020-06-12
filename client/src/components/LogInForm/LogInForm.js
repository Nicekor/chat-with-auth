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
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { AlternateEmail, Visibility, VisibilityOff } from '@material-ui/icons';
// import { Link as RouterLink } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import validate from '../../validation/loginFormValidation';

import EnterNickname from '../EnterNickname/EnterNickname';

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
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
    },
    logInForm: {
      margin: theme.spacing('auto', 2),
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      marginBottom: theme.spacing(2),
    },
    loginBtn: {
      margin: theme.spacing(2, 0),
    },
    forgotPassword: {
      alignSelf: 'flex-start',
    },
  };
});

const LogInForm = () => {
  const minWidth768 = useMediaQuery('(min-width:768px)');
  const classes = useStyles();
  const { handleFormChange, handleFormSubmit, errors } = useForm(
    onFormSubmit,
    validate
  );
  const [showPassword, setShowPassword] = useState(false);
  const [noAuthLogin, setNoAuthLogin] = useState(false);

  function onFormSubmit() {
    console.log('Successfully logged in');
  }

  const onEnterWithNoAccount = () => {
    setNoAuthLogin(true);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
  };

  if (noAuthLogin) return <EnterNickname />;
  // todo: refactor all Input to TextField
  return (
    <Box className={classes.wrapper}>
      <form
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete="off"
        className={classes.logInForm}
        spellCheck={false}
      >
        <FormControl
          required
          error={!!errors.email}
          color="primary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="email" className={classes.inputLabel}>
            Email address
          </InputLabel>
          <Input
            id="email"
            type="email"
            name="email"
            onChange={handleFormChange}
            autoFocus
            aria-describedby="email-helper-text"
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <AlternateEmail color="action" />
              </InputAdornment>
            }
          />
          <FormHelperText
            id="email-helper-text"
            className={classes.formHelperText}
          >
            {errors.email || "We'll never share your email."}
          </FormHelperText>
        </FormControl>
        <FormControl
          required
          error={!!errors.password}
          color="primary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="password" className={classes.inputLabel}>
            Password
          </InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleFormChange}
            aria-describedby="password-helper-text"
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            id="password-helper-text"
            className={classes.formHelperText}
          >
            {errors.password || "We'll never share your password."}
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
        <Button color="primary" onClick={onEnterWithNoAccount}>
          Enter without an account
        </Button>
        <FormHelperText className={classes.formHelperText}>
          Need an account?{' '}
          <Link
            variant="caption"
            component="button"
            color="textPrimary"
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
