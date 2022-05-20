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

CREATE TABLE BBY29_item_tracker (
  ID int NOT NULL AUTO_INCREMENT,
  item_user_ID int,
  url VARCHAR(400),
  title VARCHAR(200),
  priceStr VARCHAR(50),
  imgUrl VARCHAR(350),
  PRIMARY KEY (ID),
  FOREIGN KEY (item_user_ID) REFERENCES BBY29_user(ID)
);

INSERT INTO BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password, avatar_path) VALUES
('bby29test', 'BBY', 'Test', 'insertemailhere@bcit.ca', '1234567890', 0, '8uj2xIpNW29d5MwFEBfd5A==', 0),
('BryantSWE', 'Bryant', 'Lee', 'bryant@bcit.ca', '6048224011', 1, 'jkUEEPLdqJOfkvy5bUpERw==', 5),
('KasraE', 'Kasra', 'Esfa', 'kasra@bcit.ca', '6046046046', 1, 'jkUEEPLdqJOfkvy5bUpERw==', 3),
('jacobrc10', 'Jacob', 'Romano Carlsen', 'jacob@bcit.ca', '6041234567', 1, 'jkUEEPLdqJOfkvy5bUpERw==', 1),
('gabrielC', 'Gabriel', 'Clarin',  'gclarin@my.bcit.ca', '6044688425', 1,  'jkUEEPLdqJOfkvy5bUpERw==', 6),
('arronAdmin', 'Arron', 'Admin', 'arronadmin@gmail.com', '6044567890', 1, 'jkUEEPLdqJOfkvy5bUpERw==', 4),
('arronUser', 'Arron', 'User', 'arronuser@gmail.com', '7788904567', 0, '8uj2xIpNW29d5MwFEBfd5A==', 0);
