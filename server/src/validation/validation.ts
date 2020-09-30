import Joi, { object, ObjectSchema, options, ValidationResult } from 'joi';
import User from '../models/User';

// todo: check issue with the repeat password error message, have first name and last name as well instead of just name

export const registerValidation = (data: User): ValidationResult => {
  const schema: ObjectSchema = object({
    name: Joi.string().alphanum().required().label('Name'),
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().strict().min(6).label('Password'),
    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict()
      .label('Repeat Password'),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });
};

export const loginValidation = (data: User): ValidationResult => {
  const schema: ObjectSchema = object({
    email: Joi.string().required().email().label('Email address'),
    password: Joi.string().required().label('Password'),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });
};
