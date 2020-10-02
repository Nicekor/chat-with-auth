import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
      marginBottom: theme.spacing(2),
    },
    inputLabel: {
      color: theme.palette.primary.main,
    },
    formHelperText: {
      color: theme.palette.text.primary,
    },
  };
});

const MyInput = ({
  inputLabelProps,
  inputProps,
  formHelperTextProps,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <FormControl {...props} className={[classes.formControl, className].join(' ')}>
      <InputLabel {...inputLabelProps} className={classes.inputLabel} />
      <Input {...inputProps} />
      <FormHelperText
        {...formHelperTextProps}
        className={classes.formHelperText}
      />
    </FormControl>
  );
};

export default MyInput;
