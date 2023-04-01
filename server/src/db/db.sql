CREATE DATABASE jwt;

CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE users(
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password) VALUES ('Craig', 'Edney', 'caedney@btinternet.com', 'password');