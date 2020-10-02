import { Request, Response, Router } from 'express';
import path from 'path';
import multer from 'multer';
import verifyToken from '../middlewares/verifyToken';

const uploader = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: {
    fields: 10,
    fileSize: 1024 * 1024 * 20,
    files: 1,
  },
});

const router = Router();

router.post(
  '/avatar',
  verifyToken,
  uploader.single('avatarFile'),
  (req: Request, res: Response) => {
    try {
      console.log(req.file);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

export default router;
