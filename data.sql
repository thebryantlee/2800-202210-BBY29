CREATE DATABASE BBY29;

CREATE TABLE BBY29_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  admin boolean,
  password VARCHAR(50),
  PRIMARY KEY (ID)
);

INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password) VALUES
('bby29test', 'BBY', 'Test', 'insertemailhere@bcit.ca', '1234567890', 1, 'testtest'),
('BryantSWE', 'Bryant', 'Lee', 'bryant@bcit.ca', '6048224011', 1, 'bryanttest'),
('KasraE', 'Kasra', 'Esfa', 'kasra@bcit.ca', '6046046046', 0, 'Kasra');
