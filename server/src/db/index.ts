import knex from 'knex';

const knexPg = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgresql',
    database: 'chat_with_auth',
  },
});

export default knexPg;
