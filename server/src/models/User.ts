import { QueryResult } from 'pg';
import pool from '../db/index';

class User {
  user_id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async save(): Promise<User> {
    try {
      const res: QueryResult = await pool.query(
        'INSERT INTO user_login (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [this.name, this.email, this.password]
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
