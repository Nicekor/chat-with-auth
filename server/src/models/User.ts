import { QueryResult } from 'pg';
import pool from '../db/index';

class User {
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;
  avatar_id?: number;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  async save(): Promise<User> {
    try {
      const res: QueryResult = await pool.query(
        'INSERT INTO user_login (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [this.first_name, this.last_name, this.email, this.password]
      );
      return res.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findOne(email: string): Promise<User> {
    try {
      const res: QueryResult = await pool.query(
        'SELECT * FROM user_login WHERE email = $1',
        [email]
      );
      return res.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default User;
