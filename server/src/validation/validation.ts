import Joi, { object, ObjectSchema, string, ValidationResult } from 'joi';
import User from '../models/User';

// todo: check issue with the repeat password error message, have first name and last name as well instead of just name

export const registerValidation = (data: User): ValidationResult => {
  const schema: ObjectSchema = object({
    name: string().alphanum().required().label('Name'),
    email: string().required().email().label('Email address'),
    password: string().required().min(6).label('Password'),
    repeatPassword: Joi.ref('password'),
  }).with('password', 'repeatPassword');

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
    email: string().required().email().label('Email address'),
    password: string().required().label('Password'),
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
