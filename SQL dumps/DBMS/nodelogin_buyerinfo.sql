CREATE DATABASE  IF NOT EXISTS `nodelogin` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nodelogin`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: nodelogin
-- ------------------------------------------------------
-- Server version	8.0.17

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

--
-- Table structure for table `buyerinfo`
--

DROP TABLE IF EXISTS `buyerinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyerinfo` (
  `username` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `exp` varchar(20) DEFAULT NULL,
  `qual` varchar(20) DEFAULT NULL,
  `jtype` varchar(20) DEFAULT NULL,
  `phno` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyerinfo`
--

LOCK TABLES `buyerinfo` WRITE;
/*!40000 ALTER TABLE `buyerinfo` DISABLE KEYS */;
INSERT INTO `buyerinfo` VALUES ('hello123','Rajath S Shetty','2019-11-15','English','Bangalore','Beginner','B.Tech','IoT',7899837),('s','s','2019-10-31','Hindi','New Delhi','Beginner','B.Tech','ML',123),('s','s','2019-10-31','Hindi','New Delhi','Beginner','B.Tech','ML',123),('s','s','2019-10-31','Hindi','New Delhi','Beginner','B.Tech','ML',123),('w','w','2019-11-09','English','Mumbai','Advanced','B.E.','IoT',1),('qqq','qqq','2019-11-01','Hindi','New Delhi','Beginner','B.Tech','ML',123);
/*!40000 ALTER TABLE `buyerinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-11 16:27:32
