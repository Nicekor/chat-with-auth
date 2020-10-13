import knexPg from '../db';

class Addressee {
  id: string;
  firstName: string;
  lastName: string;
  lastMessage?: string;
  avatar: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    lastMessage: string,
    avatar: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastMessage = lastMessage;
    this.avatar = avatar;
  }

  // todo: Implement Message table and then join the last message to this query
  static async getAddressees(userId: string): Promise<Addressee[]> {
    const addressees: Addressee[] = await knexPg
      .select(
        knexPg.ref('UL2.user_id').as('id'),
        knexPg.ref('UL2.first_name').as('firstName'),
        knexPg.ref('UL2.last_name').as('lastName'),
        knexPg.ref('ATT.attachment_name').as('avatar')
      )
      .from(knexPg.ref('user_login').as('UL'))
      .innerJoin(knexPg.ref('friend_request').as('FR'), function () {
        this.on(function () {
          this.on('FR.requester_friend_tag', 'UL.friend_tag');
          this.orOn('FR.recipient_friend_tag', 'UL.friend_tag');
        }).andOn('FR.accepted', knexPg.raw('?', [true]));
      })
      .innerJoin(knexPg.ref('user_login').as('UL2'), function () {
        this.on(
          knexPg.raw(`"UL2"."friend_tag" = COALESCE((
            CASE WHEN "FR"."requester_friend_tag" != "UL"."friend_tag" THEN
              "FR"."requester_friend_tag"
            END), (
            CASE WHEN "FR"."recipient_friend_tag" != "UL"."friend_tag" THEN
              "FR"."recipient_friend_tag"
            END))`)
        );
      })
      .leftOuterJoin(knexPg.ref('attachment').as('ATT'), function () {
        this.on('ATT.created_by', 'UL2.user_id');
        this.andOn('ATT.attachment_type', knexPg.raw('?', ['avatar']));
      })
      .where('UL.user_id', userId);
    return addressees;
  }
}

export default Addressee;
