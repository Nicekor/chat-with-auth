import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import MyInput from '../MyInput/MyInput';

const PasswordInput = ({ inputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
  };

  return (
    <MyInput
      {...props}
      inputProps={{
        ...inputProps,
        type: showPassword ? 'text' : 'password',
        endAdornment: (
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
        ),
      }}
    />
  );
};

export default PasswordInput;
