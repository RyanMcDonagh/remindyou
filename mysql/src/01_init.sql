CREATE DATABASE remindyou;

USE remindyou;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    title VARCHAR(50) NOT NULL,

    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description text NOT NULL,

    FOREIGN KEY (list) REFERENCES lists(id)
);