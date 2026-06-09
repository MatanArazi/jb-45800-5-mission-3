-- initial SQL export for assignment
CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `description` text NOT NULL,
  `room` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_group` (`groupId`),
  CONSTRAINT `fk_meetings_group` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE
);

-- sample data
INSERT INTO `groups` (`name`) VALUES ('React Team'), ('Mobile Team'), ('UI Team');

INSERT INTO `meetings` (`groupId`, `start`, `end`, `description`, `room`) VALUES
(1, '2026-06-20 09:00:00', '2026-06-20 10:00:00', 'Sprint planning', 'Large Board Room'),
(2, '2026-05-01 14:00:00', '2026-05-01 15:30:00', 'Design review', 'Blue Room');
