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
  `timestamp` datetime NOT NULL,
  `editorid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`,`vnumber`),
  KEY `FK_actors_users` (`editorid`),
  CONSTRAINT `FK_actors_users` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.actors: ~0 rows (approximately)
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
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

-- Dumpar data för tabell movieregister.actorsmovies: ~0 rows (approximately)
/*!40000 ALTER TABLE `actorsmovies` DISABLE KEYS */;
/*!40000 ALTER TABLE `actorsmovies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.descriptions
CREATE TABLE IF NOT EXISTS `descriptions` (
  `movieid` int(10) unsigned NOT NULL,
  `vnumber` int(10) unsigned NOT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `editorid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`movieid`,`vnumber`),
  KEY `FK_descriptions_users` (`editorid`),
  CONSTRAINT `FK_descriptions_movies` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_descriptions_users` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.descriptions: ~0 rows (approximately)
/*!40000 ALTER TABLE `descriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `descriptions` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.directors
CREATE TABLE IF NOT EXISTS `directors` (
  `id` int(10) unsigned NOT NULL,
  `vnumber` int(10) unsigned NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `editorid` int(10) unsigned NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`vnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.directors: ~0 rows (approximately)
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
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

-- Dumpar data för tabell movieregister.directorsmovies: ~0 rows (approximately)
/*!40000 ALTER TABLE `directorsmovies` DISABLE KEYS */;
/*!40000 ALTER TABLE `directorsmovies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.movies
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.movies: ~0 rows (approximately)
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `editorid` int(10) unsigned NOT NULL,
  `movieid` int(10) unsigned NOT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `score` enum('1','2','3','4','5') DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`editorid`,`movieid`),
  KEY `movieeditor_fk` (`movieid`),
  CONSTRAINT `editormovie_fk` FOREIGN KEY (`editorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movieeditor_fk` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.reviews: ~0 rows (approximately)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Dumping structure for tabell movieregister.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.roles: ~0 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell movieregister.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dumpar data för tabell movieregister.usersroles: ~0 rows (approximately)
/*!40000 ALTER TABLE `usersroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersroles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
