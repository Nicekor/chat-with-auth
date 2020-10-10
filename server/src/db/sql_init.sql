CREATE DATABASE chat_with_auth;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_login (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  friend_tag varchar(10) UNIQUE,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
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

CREATE TABLE friend_request (
  friend_request_id serial PRIMARY KEY,
  requester_friend_tag varchar(10) UNIQUE,
  recipient_friend_tag varchar(10) REFERENCES user_login (friend_tag),
  accepted boolean DEFAULT FALSE
);

