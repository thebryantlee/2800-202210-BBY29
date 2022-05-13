CREATE DATABASE COMP2800;

CREATE TABLE BBY29_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(30),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(40),
  phone_number VARCHAR(20),
  admin boolean,
  password VARCHAR(50),
  PRIMARY KEY (ID)
);

INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password) VALUES
('arronAdmin', 'Arron', 'Admin', 'arronadmin@gmail.com', '6044567890', 1, 'jkUEEPLdqJOfkvy5bUpERw=='),
('arronUser', 'Arron', 'User', 'arronuser@gmail.com', '7788904567', 0, '8uj2xIpNW29d5MwFEBfd5A==');
