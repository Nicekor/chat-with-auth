import { Request, Response, Router } from 'express';
import { ValidationResult } from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { loginValidation, registerValidation } from '../validation/validation';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

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
    try {
      const emailExists: User | undefined = await User.findOne(req.body.email);
      if (emailExists) {
        return res
          .status(400)
          .json({ errors: { email: 'Email already exists' } });
      }
    } catch (err) {
      console.error(err);
    }

    // hash the password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);

    // creates a user
    const user: User = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    );

    try {
      const savedUser: User = await user.save();
      const token: string = jwt.sign(
        { userId: savedUser.user_id },
        <string>process.env.TOKEN_SECRET
      );
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.sendStatus(400);
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

    const user: User | undefined = await User.findOne(req.body.email);
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

    try {
      const token: string = jwt.sign(
        { userId: user.user_id },
        <string>process.env.TOKEN_SECRET
      );
      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.sendStatus(400);
    }
  }
);

export default router;
