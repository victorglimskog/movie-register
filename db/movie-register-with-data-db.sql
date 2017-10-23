-- --------------------------------------------------------
-- Värd:                         127.0.0.1
-- Server version:               5.7.19-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for movieregister
CREATE DATABASE IF NOT EXISTS `movieregister` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `movieregister`;

-- Dumping structure for tabell movieregister.actors
CREATE TABLE IF NOT EXISTS `actors` (
  `id` int(10) unsigned NOT NULL,
  `vnumber` int(10) unsigned NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `editorid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`,`vnumber`),
  KEY `FK_actors_users` (`editorid`),
  CONSTRAINT `FK_actors_users` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.actors: ~50 rows (approximately)
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` (`id`, `vnumber`, `firstname`, `lastname`, `timestamp`, `editorid`) VALUES
	(1, 1, 'Julia', 'Freeman', '2017-10-22 15:53:08', 56),
	(2, 1, 'Gabriella', 'Skarsgård', '2017-10-22 15:53:08', 53),
	(3, 1, 'Harrison', 'Henricson', '2017-10-22 15:53:08', 55),
	(4, 1, 'Julia', 'Ford', '2017-10-22 15:53:08', 54),
	(5, 1, 'Claude', 'Hamilton', '2017-10-22 15:53:08', 56),
	(6, 1, 'Marie', 'Freeman', '2017-10-22 15:53:08', 54),
	(7, 1, 'Harrison', 'Freeman', '2017-10-22 15:53:08', 54),
	(8, 1, 'Morgan', 'Lobe', '2017-10-22 15:53:08', 53),
	(9, 1, 'Harrison', 'Ford', '2017-10-22 15:53:08', 54),
	(10, 1, 'Denise', 'Roberts', '2017-10-22 15:53:08', 55),
	(11, 1, 'Julia', 'Freeman', '2017-10-22 15:53:08', 54),
	(12, 1, 'Claude', 'Henricson', '2017-10-22 15:53:08', 53),
	(13, 1, 'Mark', 'Janson', '2017-10-22 15:53:08', 54),
	(14, 1, 'Julia', 'Hamilton', '2017-10-22 15:53:08', 56),
	(15, 1, 'Anna', 'Freeman', '2017-10-22 15:53:08', 53),
	(16, 1, 'Morgan', 'Roberts', '2017-10-22 15:53:08', 53),
	(17, 1, 'Gabriella', 'Janson', '2017-10-22 15:53:08', 55),
	(18, 1, 'Gabriella', 'Skarsgård', '2017-10-22 15:53:08', 53),
	(19, 1, 'Marie', 'Skarsgård', '2017-10-22 15:53:08', 54),
	(20, 1, 'Marie', 'Skarsgård', '2017-10-22 15:53:08', 55),
	(21, 1, 'Harrison', 'Ford', '2017-10-22 15:53:08', 55),
	(22, 1, 'Gabriella', 'Freeman', '2017-10-22 15:53:08', 55),
	(23, 1, 'Anna', 'Bergman', '2017-10-22 15:53:08', 53),
	(24, 1, 'Harrison', 'Freeman', '2017-10-22 15:53:08', 56),
	(25, 1, 'Gabriella', 'Lobe', '2017-10-22 15:53:08', 53),
	(26, 1, 'Harrison', 'Lobe', '2017-10-22 15:53:08', 56),
	(27, 1, 'Charlie', 'Anderson', '2017-10-22 15:53:08', 55),
	(28, 1, 'Harrison', 'Anderson', '2017-10-22 15:53:08', 54),
	(29, 1, 'Charlie', 'Freeman', '2017-10-22 15:53:08', 55),
	(30, 1, 'Gabriella', 'Roberts', '2017-10-22 15:53:08', 56),
	(31, 1, 'Marie', 'Anderson', '2017-10-22 15:53:08', 53),
	(32, 1, 'Charlie', 'Ford', '2017-10-22 15:53:08', 56),
	(33, 1, 'Marie', 'Ford', '2017-10-22 15:53:08', 54),
	(34, 1, 'Gabriella', 'Roberts', '2017-10-22 15:53:08', 55),
	(35, 1, 'Harrison', 'Ford', '2017-10-22 15:53:08', 53),
	(36, 1, 'Denise', 'Roberts', '2017-10-22 15:53:08', 55),
	(37, 1, 'Morgan', 'Anderson', '2017-10-22 15:53:08', 54),
	(38, 1, 'Gabriella', 'Henricson', '2017-10-22 15:53:08', 55),
	(39, 1, 'Anna', 'Ford', '2017-10-22 15:53:08', 55),
	(40, 1, 'Julia', 'Freeman', '2017-10-22 15:53:08', 55),
	(41, 1, 'Anna', 'Freeman', '2017-10-22 15:53:08', 54),
	(42, 1, 'Julia', 'Bergman', '2017-10-22 15:53:08', 56),
	(43, 1, 'Julia', 'Anderson', '2017-10-22 15:53:08', 56),
	(44, 1, 'Harrison', 'Lobe', '2017-10-22 15:53:08', 54),
	(45, 1, 'Anna', 'Ford', '2017-10-22 15:53:08', 53),
	(46, 1, 'Anna', 'Ford', '2017-10-22 15:53:08', 55),
	(47, 1, 'Harrison', 'Bergman', '2017-10-22 15:53:08', 54),
	(48, 1, 'Gabriella', 'Ford', '2017-10-22 15:53:08', 56),
	(49, 1, 'Gabriella', 'Henricson', '2017-10-22 15:53:08', 55),
	(50, 1, 'Gabriella', 'Roberts', '2017-10-22 15:53:08', 56);
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.actorsmovies
CREATE TABLE IF NOT EXISTS `actorsmovies` (
  `actorid` int(10) unsigned NOT NULL,
  `movieid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`actorid`,`movieid`),
  KEY `FK_actorsmovies_movies` (`movieid`),
  CONSTRAINT `FK__actors` FOREIGN KEY (`actorid`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_actorsmovies_movies` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.actorsmovies: ~73 rows (approximately)
/*!40000 ALTER TABLE `actorsmovies` DISABLE KEYS */;
INSERT INTO `actorsmovies` (`actorid`, `movieid`) VALUES
	(12, 21),
	(35, 21),
	(39, 21),
	(40, 21),
	(47, 21),
	(4, 22),
	(11, 22),
	(13, 22),
	(11, 23),
	(20, 23),
	(30, 23),
	(13, 24),
	(21, 24),
	(38, 24),
	(7, 25),
	(26, 25),
	(41, 25),
	(44, 25),
	(14, 26),
	(24, 26),
	(44, 26),
	(9, 27),
	(16, 27),
	(42, 27),
	(1, 28),
	(17, 28),
	(44, 28),
	(40, 29),
	(41, 29),
	(49, 29),
	(18, 30),
	(31, 30),
	(44, 30),
	(49, 30),
	(1, 31),
	(20, 31),
	(30, 31),
	(31, 31),
	(1, 32),
	(10, 32),
	(40, 32),
	(50, 32),
	(4, 33),
	(17, 33),
	(46, 33),
	(50, 33),
	(1, 34),
	(10, 34),
	(39, 34),
	(44, 34),
	(7, 35),
	(8, 35),
	(26, 35),
	(48, 35),
	(2, 36),
	(28, 36),
	(30, 36),
	(31, 36),
	(12, 37),
	(23, 37),
	(33, 37),
	(11, 38),
	(14, 38),
	(25, 38),
	(34, 38),
	(1, 39),
	(10, 39),
	(15, 39),
	(36, 39),
	(11, 40),
	(15, 40),
	(21, 40),
	(31, 40),
	(36, 40);
/*!40000 ALTER TABLE `actorsmovies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.descriptions
CREATE TABLE IF NOT EXISTS `descriptions` (
  `movieid` int(10) unsigned NOT NULL,
  `vnumber` int(10) unsigned NOT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `editorid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`movieid`,`vnumber`),
  KEY `FK_descriptions_users` (`editorid`),
  CONSTRAINT `FK_descriptions_movies` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_descriptions_users` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.descriptions: ~20 rows (approximately)
/*!40000 ALTER TABLE `descriptions` DISABLE KEYS */;
INSERT INTO `descriptions` (`movieid`, `vnumber`, `text`, `timestamp`, `editorid`) VALUES
	(21, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 56),
	(22, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 54),
	(23, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 55),
	(24, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 56),
	(25, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 55),
	(26, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 56),
	(27, 1, 'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.', '2017-10-22 15:53:08', 54),
	(28, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 55),
	(29, 1, 'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.', '2017-10-22 15:53:08', 55),
	(30, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 54),
	(31, 1, 'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.', '2017-10-22 15:53:08', 55),
	(32, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 54),
	(33, 1, 'After the death of his father, the King of Denmark, returns home to the isolated, technologically advanced Skåne nation to succeed to the throne and take his rightful place as king.', '2017-10-22 15:53:08', 53),
	(34, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 55),
	(35, 1, 'After the death of his father, the King of Denmark, returns home to the isolated, technologically advanced Skåne nation to succeed to the throne and take his rightful place as king.', '2017-10-22 15:53:08', 54),
	(36, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 55),
	(37, 1, 'The world has changed a lot, almost everything is going down the shitters.', '2017-10-22 15:53:08', 56),
	(38, 1, 'A lonely person that suddenly finds love.', '2017-10-22 15:53:08', 56),
	(39, 1, 'Bodies are turning up around the city, each having met a uniquely gruesome demise. As the investigation proceeds, evidence points to one suspect.', '2017-10-22 15:53:08', 54),
	(40, 1, 'After the death of his father, the King of Denmark, returns home to the isolated, technologically advanced Skåne nation to succeed to the throne and take his rightful place as king.', '2017-10-22 15:53:08', 55);
/*!40000 ALTER TABLE `descriptions` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.directors
CREATE TABLE IF NOT EXISTS `directors` (
  `id` int(10) unsigned NOT NULL,
  `vnumber` int(10) unsigned NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `editorid` int(10) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`vnumber`),
  KEY `FK_directors_users` (`editorid`),
  CONSTRAINT `FK_directors_users` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.directors: ~10 rows (approximately)
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` (`id`, `vnumber`, `firstname`, `lastname`, `editorid`, `timestamp`) VALUES
	(1, 1, 'Julia', 'Bergman', 56, '2017-10-22 15:53:08'),
	(2, 1, 'Denise', 'Freeman', 53, '2017-10-22 15:53:08'),
	(3, 1, 'Marie', 'Freeman', 56, '2017-10-22 15:53:08'),
	(4, 1, 'Julia', 'Freeman', 54, '2017-10-22 15:53:08'),
	(5, 1, 'Marie', 'Roberts', 55, '2017-10-22 15:53:08'),
	(6, 1, 'Charlie', 'Bergman', 54, '2017-10-22 15:53:08'),
	(7, 1, 'Julia', 'Freeman', 55, '2017-10-22 15:53:08'),
	(8, 1, 'Claude', 'Skarsgård', 56, '2017-10-22 15:53:08'),
	(9, 1, 'Gabriella', 'Bergman', 54, '2017-10-22 15:53:08'),
	(10, 1, 'Harrison', 'Lobe', 55, '2017-10-22 15:53:08');
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.directorsmovies
CREATE TABLE IF NOT EXISTS `directorsmovies` (
  `directorid` int(10) unsigned NOT NULL,
  `movieid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`directorid`,`movieid`),
  KEY `FK__movies` (`movieid`),
  CONSTRAINT `FK__directors` FOREIGN KEY (`directorid`) REFERENCES `directors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__movies` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.directorsmovies: ~20 rows (approximately)
/*!40000 ALTER TABLE `directorsmovies` DISABLE KEYS */;
INSERT INTO `directorsmovies` (`directorid`, `movieid`) VALUES
	(7, 21),
	(2, 22),
	(8, 23),
	(1, 24),
	(6, 25),
	(4, 26),
	(9, 27),
	(4, 28),
	(8, 29),
	(6, 30),
	(6, 31),
	(7, 32),
	(7, 33),
	(9, 34),
	(8, 35),
	(10, 36),
	(1, 37),
	(3, 38),
	(3, 39),
	(8, 40);
/*!40000 ALTER TABLE `directorsmovies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.movies
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.movies: ~20 rows (approximately)
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` (`id`, `title`, `year`) VALUES
	(21, 'Return of the Mutant Zombies II', '1970'),
	(22, 'The remains of the College Monsters II', '1995'),
	(23, 'Attack of the College Monsters IV', '2003'),
	(24, 'Back to the Teenage Monsters ', '2014'),
	(25, 'The remains of the Mutant Snails ', '1995'),
	(26, 'Back to the Mutant Zombies II', '2015'),
	(27, 'Return of the College Vampires ', '2003'),
	(28, 'Return of the Giant Snakes ', '1981'),
	(29, 'Return of the Mutant Snakes ', '1981'),
	(30, 'Back to the Giant Snails IV', '1981'),
	(31, 'Back to the Mutant Pizzas IV', '1970'),
	(32, 'Back to the Teenage Snakes III', '2016'),
	(33, 'The remains of the Teenage Sharks II', '1970'),
	(34, 'The remains of the Space Pizzas IV', '2015'),
	(35, 'The remains of the College Pizzas II', '2014'),
	(36, 'Back to the Giant Pizzas IV', '1995'),
	(37, 'Back to the College Zombies IV', '2014'),
	(38, 'Back to the Teenage Pizzas ', '1995'),
	(39, 'Back to the Mutant Snails III', '2014'),
	(40, 'The remains of the Giant Monsters II', '1970');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `editorid` int(10) unsigned NOT NULL,
  `movieid` int(10) unsigned NOT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `score` enum('1','2','3','4','5') DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`editorid`,`movieid`),
  KEY `movieeditor_fk` (`movieid`),
  CONSTRAINT `editormovie_fk` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movieeditor_fk` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.reviews: ~37 rows (approximately)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` (`editorid`, `movieid`, `text`, `score`, `timestamp`) VALUES
	(53, 22, '10/10, would netflix and chill again!', '5', '2017-10-22 15:53:09'),
	(53, 24, '10/10, would netflix and chill again!', '1', '2017-10-22 15:53:09'),
	(53, 27, '10/10, would netflix and chill again!', '3', '2017-10-22 15:53:09'),
	(53, 28, 'Crap! Would never see if I knew.', '3', '2017-10-22 15:53:09'),
	(53, 30, 'Crap! Would never see if I knew.', '4', '2017-10-22 15:53:09'),
	(53, 34, 'Crap! Would never see if I knew.', '1', '2017-10-22 15:53:09'),
	(53, 37, 'Crap! Would never see if I knew.', '2', '2017-10-22 15:53:09'),
	(54, 23, 'Crap! Would never see if I knew.', '2', '2017-10-22 15:53:09'),
	(54, 25, '10/10, would netflix and chill again!', '2', '2017-10-22 15:53:09'),
	(54, 28, 'Crap! Would never see if I knew.', '1', '2017-10-22 15:53:09'),
	(54, 29, '10/10, would netflix and chill again!', '1', '2017-10-22 15:53:09'),
	(54, 31, 'Crap! Would never see if I knew.', '2', '2017-10-22 15:53:09'),
	(54, 32, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '2', '2017-10-22 15:53:09'),
	(54, 33, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '4', '2017-10-22 15:53:09'),
	(54, 35, '10/10, would netflix and chill again!', '1', '2017-10-22 15:53:09'),
	(54, 36, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '5', '2017-10-22 15:53:09'),
	(54, 37, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '3', '2017-10-22 15:53:09'),
	(54, 38, 'Crap! Would never see if I knew.', '4', '2017-10-22 15:53:09'),
	(54, 40, '10/10, would netflix and chill again!', '3', '2017-10-22 15:53:09'),
	(55, 21, '10/10, would netflix and chill again!', '1', '2017-10-22 15:53:09'),
	(55, 24, '10/10, would netflix and chill again!', '2', '2017-10-22 15:53:09'),
	(55, 25, 'Crap! Would never see if I knew.', '3', '2017-10-22 15:53:09'),
	(55, 27, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '5', '2017-10-22 15:53:09'),
	(55, 29, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '1', '2017-10-22 15:53:09'),
	(55, 30, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '4', '2017-10-22 15:53:09'),
	(55, 31, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '1', '2017-10-22 15:53:09'),
	(55, 32, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '1', '2017-10-22 15:53:09'),
	(55, 33, 'Crap! Would never see if I knew.', '3', '2017-10-22 15:53:09'),
	(55, 36, 'Crap! Would never see if I knew.', '4', '2017-10-22 15:53:09'),
	(55, 39, '10/10, would netflix and chill again!', '2', '2017-10-22 15:53:09'),
	(55, 40, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '2', '2017-10-22 15:53:09'),
	(56, 27, 'Crap! Would never see if I knew.', '1', '2017-10-22 15:53:09'),
	(56, 29, 'Crap! Would never see if I knew.', '2', '2017-10-22 15:53:09'),
	(56, 30, 'Crap! Would never see if I knew.', '4', '2017-10-22 15:53:09'),
	(56, 31, 'Crap! Would never see if I knew.', '2', '2017-10-22 15:53:09'),
	(56, 32, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '2', '2017-10-22 15:53:09'),
	(56, 33, '10/10, would netflix and chill again!', '5', '2017-10-22 15:53:09'),
	(56, 34, 'The world has changed a lot, almost everything is going down the shitters. Just like the movie ET.', '1', '2017-10-22 15:53:09'),
	(56, 37, 'Crap! Would never see if I knew.', '1', '2017-10-22 15:53:09'),
	(56, 38, 'Crap! Would never see if I knew.', '4', '2017-10-22 15:53:09');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.roles: ~3 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`) VALUES
	(34, 'blocked'),
	(35, 'user'),
	(36, 'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.users: ~5 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `email`) VALUES
	(52, 'Harrison', 'Roberts', 'admin', '1234', 'admin@movieregister.com'),
	(53, 'Morgan', 'Janson', 'user1', '1234', 'user1@movieregister.com'),
	(54, 'Julia', 'Skarsgård', 'user2', '1234', 'user2@movieregister.com'),
	(55, 'Marie', 'Roberts', 'user3', '1234', 'user3@movieregister.com'),
	(56, 'Mark', 'Hamilton', 'blockedUser', '1234', 'blockedUser@movieregister.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.usersroles
CREATE TABLE IF NOT EXISTS `usersroles` (
  `userid` int(10) unsigned NOT NULL,
  `roleid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`userid`,`roleid`),
  KEY `FK_usersroles_roles` (`roleid`),
  CONSTRAINT `FK_usersroles_roles` FOREIGN KEY (`roleid`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_usersroles_users` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.usersroles: ~6 rows (approximately)
/*!40000 ALTER TABLE `usersroles` DISABLE KEYS */;
INSERT INTO `usersroles` (`userid`, `roleid`) VALUES
	(56, 34),
	(53, 35),
	(54, 35),
	(55, 35),
	(56, 35),
	(52, 36);
/*!40000 ALTER TABLE `usersroles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
