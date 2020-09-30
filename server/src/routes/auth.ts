import { Request, Response, Router } from 'express';
import { ValidationResult } from 'joi';
import User from '../models/User';
import { loginValidation, registerValidation } from '../validation/validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

// todo: polish this, some functions are repetitive, code is kinda ugly, could split into functions

interface ErrorsJson {
  [key: string]: string;
}

router.post('/authenticate', verifyToken, (req, res) => {
  res.json(res.locals.authData);
});

router.post(
  '/register',
  async (req: Request, res: Response): Promise<Response<string | User>> => {
    // user data validation
    const { error }: ValidationResult = registerValidation(req.body);
    if (error) {
      const errorsJson: ErrorsJson = error.details.reduce(
        (result: ErrorsJson, error) => {
          result[error.context?.key!] = error.message;
          return result;
        },
        {}
      );
      return res.status(400).json({ errors: errorsJson });
    }
    // check if the user is already in the database
    const emailExist: User = await User.findOne(req.body.email);
    if (emailExist) {
      return res
        .status(400)
        .json({ errors: { email: 'Email already exists' } });
    }

    // hash the password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);

    // creates a user
    const user: User = new User(req.body.name, req.body.email, hashedPassword);

    try {
      const savedUser: User = await user.save();
      const token: string = jwt.sign(
        { id: savedUser.user_id },
        <string>process.env.TOKEN_SECRET
      );
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(400).send(err);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response): Promise<Response<string>> => {
    const { error }: ValidationResult = loginValidation(req.body);
    if (error) {
      const errorsJson: ErrorsJson = error.details.reduce(
        (result: ErrorsJson, error) => {
          result[error.context?.key!] = error.message;
          return result;
        },
        {}
      );
      return res.status(400).json({ errors: errorsJson });
    }

    const user: User = await User.findOne(req.body.email);
    if (!user) {
      return res.status(400).json({
        errors: {
          email: 'Email or password is wrong',
          password: 'Email or password is wrong',
        },
      });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({
        errors: {
          email: 'Email or password is wrong',
          password: 'Email or password is wrong',
        },
      });
    }

    // create and assign a token
    const token: string = jwt.sign(
      { id: user.user_id },
      <string>process.env.TOKEN_SECRET
    );
    return res.json({ token });
  }
);

export default router;
