CREATE TABLE 2800_202210_BBY29_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  admin BIT,
  password VARCHAR(50),
  PRIMARY KEY (ID)
);

CREATE TABLE 2800_202210_BBY29_user_timeline (
  timeline_ID int NOT NULL AUTO_INCREMENT,
  user_ID int NOT NULL,
  postdate VARCHAR(50),
  posttext VARCHAR(1000),
  posttime VARCHAR(50),
  postviews VARCHAR(50),
  PRIMARY KEY (timeline_ID),
  FOREIGN KEY (user_ID) REFERENCES A01312126_user (ID)
);

INSERT INTO 2800_202210_BBY29_user (user_name, first_name, last_name, email, phone_number, admin, password) VALUES
('bby29test', 'BBY', 'Test', 'insertemailhere@bcit.ca', '1234567890', 1, 'testtest'),
('BryantSWE', 'Bryant', 'Lee', 'bryant@bcit.ca', '6048224011', 1, 'bryanttest'),
('KasraE', 'Kasra', 'Esfa', 'kasra@bcit.ca', '6046046046', 0, 'Kasra');

INSERT INTO 2800_202210_BBY29_user_timeline (user_ID, postdate, posttext, posttime, postviews) VALUES
('3', DATE(NOW() - INTERVAL 1 DAY), 'Hello, I am Trevor Zegras, a rookie in the Anaheim Ducks organization.', '22:59', '69'),
('3', DATE(NOW() - INTERVAL 2 DAY), 'I played my college hockey at Boston University, and I represented the USA at the World Jr Championships.', '21:59', '70'),
('3', DATE(NOW() - INTERVAL 3 DAY), 'My favorite move in hockey is the Michigan, which is sort of like a lacrosse goal. I have an assist and two goals doing that move this season, leading to a Play of the Year award.', '22:52', '78'),
('3', DATE(NOW() - INTERVAL 4 DAY), 'Why did the Ducks not let me choose my number? The number 46 is so weird.', '12:07', '90'),
('3', DATE(NOW() - INTERVAL 5 DAY), 'My buddy Cole Caufield is going to be a future star. We played together in the NTDP.', '09:49', '420');
