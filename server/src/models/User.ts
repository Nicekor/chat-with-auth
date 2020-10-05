import knexPg from '../db/index';
import { UserName, UserNameOptions } from '../interfaces/user.interface';

class User {
  user_id?: string;
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
      const savedUserRows: User[] = await knexPg
        .insert({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        })
        .into<User>('user_login')
        .returning('*');
      return savedUserRows[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findOne(newEmail: string): Promise<User | undefined> {
    try {
      const user: User | undefined = await knexPg
        .from<User>('user_login')
        .where({ email: newEmail })
        .first();
      return user;
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
