CREATE DATABASE chat_with_auth;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_login(
  user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(1024) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE attachment(
  attachment_id INT PRIMARY KEY,
  attachment_type VARCHAR(255),
  attachment_name VARCHAR(255)
);

CREATE TABLE addressee(
  addressee_id uuid,
  last_message VARCHAR(255),
  avatar_id INT,
  CONSTRAINT fk_user
    FOREIGN KEY(addressee_id)
    REFERENCES user_login(user_id),
  CONSTRAINT fk_attachment
    FOREIGN KEY (avatar_id)
    REFERENCES attachment(attachment_id)
);