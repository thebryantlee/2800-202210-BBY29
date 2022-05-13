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
  avatar_path int,
  PRIMARY KEY (ID)
);

INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password, avatar_path) VALUES
('bby29test', 'BBY', 'Test', 'insertemailhere@bcit.ca', '1234567890', 0, 'testtest', 0),
('BryantSWE', 'Bryant', 'Lee', 'bryant@bcit.ca', '6048224011', 1, 'bryanttest', 0),
('KasraE', 'Kasra', 'Esfa', 'kasra@bcit.ca', '6046046046', 1, 'Kasra', 0),
('jacobrc10', 'Jacob', 'Romano Carlsen', 'jacob@bcit.ca', '6041234567', 1, 'adminpassword', 0),
('gabrielC', 'Gabriel', 'Clarin',  'gclarin@my.bcit.ca', '6044688425', 1,  'gabrieltest', 0);
