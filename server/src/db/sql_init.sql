CREATE DATABASE chat_with_auth;
CREATE TABLE user_login(
  id uuid PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(1024) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);