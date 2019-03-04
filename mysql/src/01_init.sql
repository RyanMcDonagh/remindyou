CREATE DATABASE remindyou;

USE remindyou;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    confirmed_at DATETIME NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    title VARCHAR(50) NOT NULL,

    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description text NOT NULL,

    FOREIGN KEY (list_id) REFERENCES lists(id)
);