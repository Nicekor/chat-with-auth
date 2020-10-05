CREATE DATABASE chat_with_auth;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_login (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password VARCHAR(1024) NOT NULL,
  created_at timestamp DEFAULT NOW()
);

CREATE TABLE attachment (
  attachment_id serial PRIMARY KEY,
  attachment_type varchar(255),
  attachment_mimetype varchar(255),
  attachment_name varchar(255),
  attachment_description varchar(255),
  created_by uuid REFERENCES user_login (user_id)
);