import jwt from 'jsonwebtoken';

const verifySocketToken = (req, next) => {
  const bearerHeader: string | undefined = req.headers.authorization;
  if (!bearerHeader) {
    return next(new Error('Unauthorized'));
  }
  const bearerToken: string | undefined = bearerHeader?.split(' ')[1];

  try {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const authData: string | object = jwt.verify(
      <string>bearerToken,
      <string>process.env.TOKEN_SECRET
    );
    req.authData = authData;
    next();
  } catch (err) {
    return next(new Error('Unauthorized'));
  }
};

export default verifySocketToken;
