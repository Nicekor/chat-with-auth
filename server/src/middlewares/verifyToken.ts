import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.header('auth-token');
  if (!token) {
    res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(
      <string>token,
      <string>process.env.TOKEN_SECRET
    );
    res.json(verified);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default verifyToken;
