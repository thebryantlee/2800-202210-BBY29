CREATE DATABASE COMP2800;

CREATE TABLE BBY29_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(40),
  phone_number VARCHAR(20),
  admin boolean,
  password VARCHAR(50),
  avatar_path int,
  UNIQUE(user_name),
  PRIMARY KEY (ID),
  item1 int,
  item2 int,
  item3 int,
  item4 int,
  item5 int,
  item6 int,
  checkedout boolean
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



CREATE TABLE news_post (
  ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  title VARCHAR(80) NOT NULL,
  post_datetime DATETIME NOT NULL,
  category int NOT NULL,
  full_article MEDIUMTEXT,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES BBY29_user(ID)
);

INSERT INTO news_post (user_id, title, post_datetime, category, full_article) VALUES
(2, 'Intel CEO expects chip shortage into 2024', '2022-05-01 00:00:00', 3, 'Although GPU prices are slowly getting better, do not expect the entire chip shortage to end anytime soon. Intel CEO Pat Gelsinger now expects the semiconductor industry to suffer supply shortages until 2024.'),
(3, 'AMD Reveals Ryzen 7000 Dragon Range and Phoenix Mobile CPUs', '2022-05-02 00:00:00', 2, 'AMD has confirmed some heavily anticipated upcoming product releases with the Q1 financial results. But the highlight was AMD recent rumors claiming that they were prepping Zen 4-based Ryzen 7000 chips for desktops, code-named Raphael, which will launch later this year, while next year we will get APUs for thing and light notebooks code-named Phoenix, and more powerful laptop chips code-named Dragon Range.'),
(4, 'Razer announces first laptop with a 240Hz OLED screen', '2022-05-03 00:00:00', 1, 'Razer just announced that the their newest Blade 15 laptop will be the first laptop with a 240 Hz OLED display. While OLED screen laptops and 300Hz laptops have existed prior, there has yet to be a laptop with both.');