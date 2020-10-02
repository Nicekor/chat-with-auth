CREATE DATABASE chat_with_auth;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE attachment (
  attachment_id int PRIMARY KEY,
  attachment_type varchar(255),
  attachment_name varchar(255)
);

CREATE TABLE user_login (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password VARCHAR(1024) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  avatar_id int REFERENCES attachment (attachment_id)
);

