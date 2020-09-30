import React, { useState } from 'react';
import {
  FormHelperText,
  Link,
  Button,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import useForm from '../../hooks/useForm';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import MyInput from '../UI/MyInput/MyInput';
import PasswordInput from '../UI/PasswordInput/PasswordInput';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => {
  return {
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
    formHelperText: {
      color: theme.palette.text.primary,
    },
  };
});

const LogInForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { loginUser, authenticate } = useAuth(() => {
    history.replace('/chats');
  });

  const { values, handleFormChange, handleFormSubmit } = useForm(async () => {
    try {
      const { token, errors } = await loginUser(values);
      if (errors) {
        setErrors(errors);
      } else if (token) {
        localStorage.setItem('token', token);
        await authenticate();
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Box className={classes.wrapper}>
      <form
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        noValidate
        autoComplete="off"
        className={classes.logInForm}
        spellCheck={false}
      >
        <MyInput
          color="primary"
          required
          error={!!errors.email}
          inputLabelProps={{
            htmlFor: 'name',
            children: 'Email address',
          }}
          inputProps={{
            id: 'email',
            type: 'email',
            name: 'email',
            'aria-describedby': 'email-helper-text',
          }}
          formHelperTextProps={{
            id: 'email-helper-text',
            children: errors.email || "We'll never share your email",
          }}
        />

        <PasswordInput
          color="primary"
          required
          error={!!errors.password}
          inputLabelProps={{
            htmlFor: 'password',
            children: 'Password',
          }}
          inputProps={{
            id: 'password',
            name: 'password',
            'aria-describedby': 'password-helper-text',
          }}
          formHelperTextProps={{
            id: 'password-helper-text',
            children: errors.password || "We'll never share your password.",
          }}
        />

        <Link
          variant="body2"
          color="textPrimary"
          component={RouterLink}
          to="forgot-password"
        >
          Forgot your password?
        </Link>
        <Button type="submit" color="primary">
          Login
        </Button>
        <Typography variant="body2" align="center" color="textPrimary">
          OR
        </Typography>
        <Button color="primary" onClick={() => {}}>
          Enter without an account
        </Button>
        <FormHelperText className={classes.formHelperText}>
          Need an account?{' '}
          <Link
            variant="caption"
            color="textPrimary"
            component={RouterLink}
            to="register"
          >
            Register
          </Link>
        </FormHelperText>
      </form>
    </Box>
  );
};

export default LogInForm;
