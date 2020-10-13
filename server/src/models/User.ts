import Knex from 'knex';
import { nanoid } from 'nanoid';
import knexPg from '../db/index';
import { UserName, UserNameOptions } from '../interfaces/user.interface';

class User {
  user_id?: string;
  friend_tag?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.password = password;
  }

  async save(): Promise<User> {
    try {
      const savedUserRows: User[] = await knexPg<User>('user_login')
        .insert({
          friend_tag: nanoid(10),
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        })
        .returning('*');
      return savedUserRows[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findOne(
    newEmail?: string,
    userId?: string
  ): Promise<User | undefined> {
    const whereClause: Readonly<Partial<Knex.MaybeRawRecord<User>>> = newEmail
      ? { email: newEmail }
      : { user_id: userId };
    try {
      const user: User | undefined = await knexPg<User>('user_login')
        .where(whereClause)
        .first();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getFriendTag(userId: string): Promise<string | undefined> {
    try {
      const user: Pick<User, 'friend_tag'> | undefined = await knexPg<User>(
        'user_login'
      )
        .select('friend_tag')
        .where({ user_id: userId })
        .first();
      return user?.friend_tag;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getUserName(
    userId: string,
    options: UserNameOptions
  ): Promise<string> {
    const columns: (string | false | undefined)[] = [
      options.firstName && 'first_name',
      options.lastName && 'last_name',
      options.fullName && 'first_name',
      options.fullName && 'last_name',
    ].filter(Boolean);

    const userName: UserName = (await knexPg
      .select(columns)
      .from<User>('user_login')
      .where({ user_id: userId })
      .first()) as UserName;

    return Object.values(userName).join(' ');
  }
}

export default User;
