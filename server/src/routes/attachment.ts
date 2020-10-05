import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import Attachment from '../models/Attachment';
import {
  AvatarPos,
  PictureDimensions,
} from '../interfaces/attachment.interface';
import verifyToken from '../middlewares/verifyToken';
import fs from 'fs';

const uploadsFolder = path.join(__dirname, '../uploads');

const uploader = multer({
  dest: uploadsFolder,
  limits: {
    fileSize: 1024 * 1024 * 20,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const router = Router();

router.post(
  '/avatar',
  verifyToken,
  uploader.single('picFile'),
  async (req, res) => {
    const userId: string = res.locals.authData.userId;
    const file = req.file;
    const fileName: string = file.filename;
    const avatarPos: AvatarPos = JSON.parse(req.body.avatarPos);
    const picDimensions: PictureDimensions = JSON.parse(req.body.picDimensions);
    const picPath = path.join(uploadsFolder, `/${fileName}`);
    try {
      // if there is an avatar already, delete it
      const avatarExists: Attachment | undefined = await Attachment.findOne(
        userId
      );
      if (avatarExists) {
        fs.unlinkSync(path.join(uploadsFolder, avatarExists.attachment_name));
        await Attachment.delete(avatarExists.attachment_name);
      }

      // crop picture to create avatar
      await sharp(picPath)
        .rotate() // this removes the EXIF Orientation tag
        .extract({
          left: Math.round(avatarPos.x * picDimensions.width),
          top: Math.round(avatarPos.y * picDimensions.height),
          width: Math.round(avatarPos.width * picDimensions.width),
          height: Math.round(avatarPos.height * picDimensions.height),
        })
        .toFile(picPath + '_ava');

      // delete original picture
      fs.unlinkSync(picPath);

      // create avatar
      const avatar: Attachment = new Attachment(
        'avatar',
        file.mimetype,
        fileName + '_ava',
        'Avatar',
        userId
      );
      const savedAvatar: Attachment = await avatar.save();
      return res.sendFile(
        path.join(uploadsFolder, (<Attachment>savedAvatar).attachment_name)
      );
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

router.get('/avatar', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  try {
    const avatar: Attachment | undefined = await Attachment.findOne(userId);
    if (!avatar) {
      return res.sendStatus(404);
    }
    return res.sendFile(
      path.join(uploadsFolder, (<Attachment>avatar).attachment_name)
    );
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
