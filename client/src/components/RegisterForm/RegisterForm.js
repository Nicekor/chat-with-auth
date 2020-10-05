import React, { useEffect, useState } from 'react';
import { Button, makeStyles, Box } from '@material-ui/core';
import useForm from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';

import MyInput from '../UI/MyInput/MyInput';
import PasswordInput from '../UI/PasswordInput/PasswordInput';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      margin: 'auto',
      paddingBottom: theme.measures.header.height,
    },
    registerForm: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
    },
  };
});

const RegisterForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { isAuthenticated, registerUser, authenticate } = useAuth(
    (userData) => {
      history.replace('/chats');
    }
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/chats');
    }
  }, [isAuthenticated, history]);

  const { values, handleFormChange, handleFormSubmit } = useForm(async () => {
    try {
      const { token, errors } = await registerUser(values);
      if (errors) {
        setErrors(errors);
      }
      if (token) {
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
        className={classes.registerForm}
        spellCheck={false}
      >
        <MyInput
          color="primary"
          required
          error={!!errors.firstName}
          inputLabelProps={{
            htmlFor: 'first-name',
            children: 'First Name',
          }}
          inputProps={{
            id: 'first-name',
            type: 'text',
            name: 'firstName',
            autoFocus: true,
            'aria-describedby': 'first-name-helper-text',
          }}
          formHelperTextProps={{
            id: 'first-name-helper-text',
            children: errors.firstName || "We'll never share your name",
          }}
        />
        <MyInput
          color="primary"
          required
          error={!!errors.lastName}
          inputLabelProps={{
            htmlFor: 'last-name',
            children: 'Last Name',
          }}
          inputProps={{
            id: 'last-name',
            type: 'text',
            name: 'lastName',
            'aria-describedby': 'last-name-helper-text',
          }}
          formHelperTextProps={{
            id: 'last-name-helper-text',
            children: errors.lastName || "We'll never share your name",
          }}
        />
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

        <PasswordInput
          color="primary"
          required
          error={!!errors.repeatPassword}
          inputLabelProps={{
            htmlFor: 'repeat-password',
            children: 'Repeat Password',
          }}
          inputProps={{
            id: 'repeat-password',
            name: 'repeatPassword',
            'aria-describedby': 'repeat-password-helper-text',
          }}
          formHelperTextProps={{
            id: 'repeat-password-helper-text',
            children:
              errors.repeatPassword || "We'll never share your password",
          }}
        />
        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
