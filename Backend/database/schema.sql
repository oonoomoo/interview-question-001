CREATE DATABASE IF NOT EXISTS userdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE userdb;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  birthDate DATE,
  age INT,
  address VARCHAR(255),
  PRIMARY KEY (id)
);
