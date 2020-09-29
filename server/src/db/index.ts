import { Pool } from 'pg';

const pool: Pool = new Pool({
  user: 'postgres',
  password: 'postgresql',
  host: 'localhost',
  port: 5432,
  database: 'chat_with_auth',
});

export default pool;
