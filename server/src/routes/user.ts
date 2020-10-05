import { Request, Response, Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import User from '../models/User';

const router = Router();

router.get(
  '/name/:nameSection?/',
  verifyToken,
  async (req: Request, res: Response): Promise<Response<string>> => {
    const userId: string = res.locals.authData.userId;
    const reqFirstName: boolean = req.params.nameSection === 'firstName';
    const reqLastName: boolean = req.params.nameSection === 'lastName';
    try {
      const userName: string = await User.getUserName(userId, {
        firstName: reqFirstName,
        lastName: reqLastName,
        fullName: !reqFirstName && !reqLastName,
      });

      return res.json(userName);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

export default router;
