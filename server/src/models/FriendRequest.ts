import knexPg from '../db';
import {
  FriendRequestData,
  FriendRequestDB,
} from '../interfaces/friendRequest.interface';

class FriendRequest {
  friendRequestId?: string;
  requesterFriendTag: string;
  recipientFriendTag: string;
  accepted: boolean;

  constructor(
    requesterFriendTag: string,
    recipientFriendTag: string,
    accepted = false
  ) {
    this.requesterFriendTag = requesterFriendTag;
    this.recipientFriendTag = recipientFriendTag;
    this.accepted = accepted;
  }

  static async findOne(
    requester: string,
    recipient: string
  ): Promise<FriendRequestDB | undefined> {
    const friendRequest: FriendRequestDB | undefined = await knexPg<
      FriendRequestDB
    >('friend_request')
      .select('*')
      .where({
        requester_friend_tag: requester,
        recipient_friend_tag: recipient,
      })
      .orWhere({
        requester_friend_tag: recipient,
        recipient_friend_tag: requester,
      })
      .first();
    return friendRequest;
  }

  static async send(
    requesterFriendTag: string,
    recipientFriendTag: string
  ): Promise<FriendRequestDB> {
    const friendRequestRows: FriendRequestDB[] = await knexPg<FriendRequestDB>(
      'friend_request'
    )
      .insert({
        requester_friend_tag: requesterFriendTag,
        recipient_friend_tag: recipientFriendTag,
        accepted: false,
      })
      .returning('*');
    return friendRequestRows[0];
  }

  static async getFriendRequests(
    friendTag: string
  ): Promise<FriendRequestData[]> {
    const friendRequests: FriendRequestData[] = await knexPg
      .select(
        'user_login.first_name',
        'user_login.last_name',
        knexPg
          .ref('friend_request.requester_friend_tag')
          .as('requesterFriendTag'),
        knexPg
          .ref('friend_request.recipient_friend_tag')
          .as('recipientFriendTag'),
        knexPg.ref('friend_request.friend_request_id').as('friendRequestId'),
        'friend_request.accepted',
        'attachment.attachment_name'
      )
      .from<FriendRequestDB>('friend_request')
      .innerJoin(
        'user_login',
        'user_login.friend_tag',
        'friend_request.requester_friend_tag'
      )
      .leftOuterJoin('attachment', function () {
        this.on('attachment.created_by', '=', 'user_login.user_id');
        this.andOn('attachment.attachment_type', knexPg.raw('?', ['avatar']));
      })
      .where('friend_request.recipient_friend_tag', friendTag);
    return friendRequests;
  }

  static async delete(
    requesterFriendTag: string,
    recipientFriendTag: string
  ): Promise<void> {
    await knexPg<FriendRequestDB>('friend_request')
      .where({
        requester_friend_tag: requesterFriendTag,
        recipient_friend_tag: recipientFriendTag,
      })
      .del();
  }

  static async accept(
    requesterFriendTag: string,
    recipientFriendTag: string
  ): Promise<void> {
    await knexPg<FriendRequestDB>('friend_request')
      .where({
        requester_friend_tag: requesterFriendTag,
        recipient_friend_tag: recipientFriendTag,
      })
      .update({
        accepted: true,
      });
  }
}

export default FriendRequest;
