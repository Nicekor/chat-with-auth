import { Request, Response, Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Addressee from '../models/Adressee';

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const userId: string = res.locals.authData.userId;
  try {
    const addressees: Addressee[] = await Addressee.getAddressees(userId);
    const addresseesFormated = addressees.map(
      ({ firstName, lastName, ...rest }) => {
        return {
          name: [firstName, lastName].join(' '),
          ...rest,
        };
      }
    );
    res.status(200).json(addresseesFormated);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
