import Attachment from '../models/Attachment';
import FriendRequest from '../models/FriendRequest';
import User from '../models/User';

export interface FriendRequestDB {
  friend_request_id: string;
  requester_friend_tag: string;
  recipient_friend_tag: string;
  accepted: boolean;
}

export type FriendRequestData = Pick<User, 'first_name' | 'last_name'> &
  FriendRequest &
  Pick<Attachment, 'attachment_name'>;

export interface FriendRequestUI {
  name: string;
  accepted: boolean;
  avatar: string;
  requesterFriendTag: string;
  recipientFriendTag: string;
}
