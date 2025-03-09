-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: spiritx1-jupiter-1.h.aivencloud.com    Database: secureconnect
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '090fdcfb-fbd4-11ef-98d9-1ed4c2851038:1-291';

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dasun123','$2b$10$kKXathIUd0V6ecIhjkCeceKgeBUBfJJI.oEaWZlRKXb2sfpFh6Qxm'),(2,'Kasun333','$2b$10$n37cnELjFpz9m845rhBTM.tEANwdAY.ybCXoTqy1sedEj.RGGGO7e'),(3,'Kasun3333','$2b$10$DWhKy//xgX7DgpOu985Q4.wtwrfUNGYI/JyePG12nyT2uMJYcCkWW'),(4,'asith111','$2b$10$2VhnWBKtwa9SunpG0zG6U.uYncwv6jfWZkm.TzbARhgyolRtYNZ6e'),(5,'HirunaNimesh','$2b$10$YJhu4w1BYrLAiKJpE9I3GeC.SpxGRQJ7QV0BU207FFV.FOY0nkZ1u'),(6,'Jayasinghe','$2b$10$nCrfBzZoiMBei9bK4U.lKOAkwx7rfw5XkUOReHE.C/92E2U77Etm.'),(7,'hirunanimeshjay','$2b$10$5uEZ2LYR8wBiFMzAiqIjuO1DXHQJjf4naUN2jfDz.mAUUM/gTdhpu'),(8,'AsithDilusha','$2b$10$Wy4wlNHgy/kpBYR/flF8huLCUFsdSbsvpwOyStF9KEohUnPEy5epK'),(9,'Ravindu2005','$2b$10$aPYyxBj/nPzDEEw4s4fg2ud51rn4C8PKd6oNRpUeNmfEYuof4M65e'),(10,'Kasun2002','$2b$10$4X5/zDRtBVegX6qMXd2lYOCpG.Fg/6paT/B/lllvnoNml8xlE6jY.'),(11,'Kasun33333','$2b$10$/bNS2wiVDUbbnH2Wbv03keqTN3WdWmYgP4n6xaWD3Y7RA1JH/Bc72'),(12,'Ashindu1','$2b$10$rAl0rchj4dpFyQgr.FlBueHoiGh76xP1t8zXyRgOEBQaDB3UBaN7K'),(13,'Dasun2002','$2b$10$aPx9VPv1KIfI1EZIcGoEYOM2J9fUOyr42u4gKeyyoEcoNb/oSye4e');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2025-03-09 20:07:19
