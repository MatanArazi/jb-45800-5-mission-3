-- MySQL dump 10.13  Distrib 9.7.0, for Linux (x86_64)
--
-- Host: localhost    Database: meetings_db
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '76717488-63ce-11f1-8a48-da5a115e07e8:1-27';

--
-- Table structure for table `development_groups`
--

DROP TABLE IF EXISTS `development_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `development_groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `development_groups`
--

LOCK TABLES `development_groups` WRITE;
/*!40000 ALTER TABLE `development_groups` DISABLE KEYS */;
INSERT INTO `development_groups` VALUES (1,'Team UI'),(2,'Team Mobile'),(3,'Team React'),(4,'Team Backend'),(5,'Team DevOps');
/*!40000 ALTER TABLE `development_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `meeting_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text,
  `room` varchar(100) NOT NULL,
  PRIMARY KEY (`meeting_id`),
  KEY `fk_meetings_group` (`group_id`),
  CONSTRAINT `fk_meetings_group` FOREIGN KEY (`group_id`) REFERENCES `development_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,1,'2025-05-01 09:00:00','2025-05-01 10:00:00','Sprint 12 planning session','Blue Room'),(2,1,'2025-05-08 14:00:00','2025-05-08 15:30:00','Design system review','New York Room'),(3,2,'2025-05-03 11:00:00','2025-05-03 12:00:00','iOS release retrospective','Large Board Room'),(4,2,'2025-05-15 10:00:00','2025-05-15 11:00:00','Android performance deep-dive','Blue Room'),(5,3,'2025-05-10 09:30:00','2025-05-10 10:30:00','Component library migration','New York Room'),(6,4,'2025-05-20 13:00:00','2025-05-20 14:00:00','API versioning strategy','Large Board Room'),(7,5,'2025-05-22 15:00:00','2025-05-22 16:00:00','CI/CD pipeline audit','Blue Room'),(8,1,'2026-07-01 09:00:00','2026-07-01 10:00:00','Sprint 20 planning session','Blue Room'),(9,1,'2026-07-05 14:00:00','2026-07-05 15:30:00','Accessibility audit kickoff','New York Room'),(10,2,'2026-07-02 11:00:00','2026-07-02 12:00:00','Push notifications architecture','Large Board Room'),(11,3,'2026-07-08 09:30:00','2026-07-08 10:30:00','React 19 upgrade planning','Blue Room'),(12,4,'2026-07-10 13:00:00','2026-07-10 14:30:00','Microservices breakdown discussion','New York Room'),(13,5,'2026-07-15 15:00:00','2026-07-15 16:00:00','Kubernetes cluster scaling review','Large Board Room');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-09  9:24:16
