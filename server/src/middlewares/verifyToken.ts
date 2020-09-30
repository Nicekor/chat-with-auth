import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader: string | undefined = req.header('Authorization');
  if (!bearerHeader) {
    return res.sendStatus(403);
  }
  const bearerToken: string | undefined = bearerHeader?.split(' ')[1];

  try {
    const authData = jwt.verify(
      <string>bearerToken,
      <string>process.env.TOKEN_SECRET
    );
    res.locals.authData = authData;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Token is not valid' });
  }
};

export default verifyToken;
