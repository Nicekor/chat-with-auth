import React, { useState, useContext } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Link,
  Button,
  makeStyles,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useForm from '../../hooks/useForm';
import validate from '../../validation/loginFormValidation';
import { AuthContext } from '../../context/Auth';
import { useHistory } from 'react-router-dom';

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
      margin: 'auto',
      paddingBottom: theme.measures.header.height,
    },
    logInForm: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
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
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate } = useContext(AuthContext);
  const history = useHistory();

  const { handleFormChange, handleFormSubmit, errors } = useForm(() => {
    console.log('Successfully logged in');
  }, validate);

  const onEnterWithNoAccount = () => {
    authenticate();
    history.push('/nickname');
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
  };

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
    </Box>
  );
};

export default LogInForm;
