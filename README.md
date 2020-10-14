# Chat-with-auth (very creative I know)

## Project Demo
https://www.youtube.com/watch?v=2Yrj9KjrAhw&feature=youtu.be

## Features: 
 - Designed for mobile first;
 - User sessions using tokens;
 - User data validation as well as passwords enctypted in the database;
 - User can upload an avatar;
 - User can send friend requests to other users using a friend tag;
 - Real time messaging with friends only.

## Missing Features (TODO):
 - Save chat messages in the database so the user can see previous sent messages (they are currently living in the Chat component memory);
 - Search for an addressee/friend;
 - Desktop layout.

## Languages/Frameworks used:
 - React.js
 - Node.js / Express.js
 - PostgreSQL

## Steps to run it locally in the dev mode:
### Run the frontend server:
  1. `npm install`;
  2. `npm start`

### Run the backend server:
  1. Create your `TOKEN_SECRET` in a `.env` file;
  2. `npm install`;
  3. `npm run initdb` (this will run the `./src/db/sql_init.sql` script with `psql`. If you prefer you can copy paste that code into your postgres database environment);
  4. `npm run dev`

