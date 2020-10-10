import { Request, Response, Router } from 'express';
import { ValidationResult } from 'joi';
import {
  FriendRequestData,
  FriendRequestDB,
  FriendRequestUI,
} from '../interfaces/friendRequest.interface';
import verifyToken from '../middlewares/verifyToken';
import FriendRequest from '../models/FriendRequest';
import User from '../models/User';
import { addFriendValidation } from '../validation/validation';

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

router.get('/friend-tag', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  try {
    const userFriendTag: string = <string>await User.getFriendTag(userId);
    return res.status(200).json(userFriendTag);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.get('/friend-requests', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  try {
    const userFriendTag: string = <string>await User.getFriendTag(userId);
    const friendRequests: FriendRequestData[] = await FriendRequest.getFriendRequests(
      userFriendTag
    );
    const friendRequestsFormatted: FriendRequestUI[] = friendRequests.map(
      ({ first_name, last_name, attachment_name, ...rest }) => {
        return {
          name: [first_name, last_name].join(' '),
          avatar: attachment_name,
          ...rest,
        };
      }
    );
    return res.status(200).json(friendRequestsFormatted);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.post('/friend-request', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  const recipientFriendTag: string = req.body.recipient;
  try {
    const userFriendTag: string = <string>await User.getFriendTag(userId);
    const { error }: ValidationResult = addFriendValidation(
      userFriendTag,
      recipientFriendTag
    );
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const friendRequestExists:
      | FriendRequestDB
      | undefined = await FriendRequest.findOne(
      userFriendTag,
      recipientFriendTag
    );
    if (friendRequestExists) {
      return res
        .status(400)
        .json({
          error: 'A friend request already exists or you are aldready friends.',
        });
    }
    await FriendRequest.send(userFriendTag, recipientFriendTag);
    return res.sendStatus(201);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: "This Friend Tag doesn't exist." });
    }
    console.error(err);
    return res.sendStatus(500);
  }
});

router.delete('/friend-request', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  const requesterFriendTag: string = req.body.requester;
  try {
    const recipientFriendTag: string = <string>await User.getFriendTag(userId);
    await FriendRequest.delete(requesterFriendTag, recipientFriendTag);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.put('/friend-request', verifyToken, async (req, res) => {
  const userId: string = res.locals.authData.userId;
  const requesterFriendTag: string = req.body.requester;
  try {
    const recipientFriendTag: string = <string>await User.getFriendTag(userId);
    await FriendRequest.accept(requesterFriendTag, recipientFriendTag);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
