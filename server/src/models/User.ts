import { QueryResult } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db/index';

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;

  constructor(name: string, email: string, password: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = new Date();
  }

  async save(): Promise<User | void> {
    try {
      const res: QueryResult = await pool.query(
        'INSERT INTO user_login (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [this.id, this.name, this.email, this.password]
      );
      return res.rows[0];
    } catch (err) {
      console.error(err.stack);
    }
  }

  static async findOne(email: string): Promise<User | undefined> {
    try {
      const res: QueryResult = await pool.query(
        'SELECT * FROM user_login WHERE email = $1',
        [email]
      );
      return res.rows[0];
    } catch (err) {
      console.error(err.stack);
    }
  }
}

export default User;
