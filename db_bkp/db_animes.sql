CREATE DATABASE  IF NOT EXISTS `modelanimes` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `modelanimes`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: modelanimes
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `animes`
--

DROP TABLE IF EXISTS `animes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animes` (
  `idanimes` int NOT NULL AUTO_INCREMENT,
  `titleAnime` varchar(45) NOT NULL,
  `descriptionAnime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idanimes`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animes`
--

LOCK TABLES `animes` WRITE;
/*!40000 ALTER TABLE `animes` DISABLE KEYS */;
INSERT INTO `animes` VALUES (2,'Xaropao','xaropinho'),(4,'memino que não sabia voar','e depois aprendeu'),(5,'xupa cabra esse é o cara','show'),(6,'sword','Deu certo'),(7,'hEROKU','Sim');
/*!40000 ALTER TABLE `animes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episodios`
--

DROP TABLE IF EXISTS `episodios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodios` (
  `idepisodios` int NOT NULL AUTO_INCREMENT,
  `titleEpisodio` varchar(45) NOT NULL,
  `descriptionEpisodio` varchar(45) DEFAULT NULL,
  `animes_idanimes` int NOT NULL,
  `imgEpisodio` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idepisodios`,`animes_idanimes`),
  KEY `fk_episodios_animes_idx` (`animes_idanimes`),
  CONSTRAINT `fk_episodios_animes` FOREIGN KEY (`animes_idanimes`) REFERENCES `animes` (`idanimes`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodios`
--

LOCK TABLES `episodios` WRITE;
/*!40000 ALTER TABLE `episodios` DISABLE KEYS */;
INSERT INTO `episodios` VALUES (8,'Haikyuu!','Hinata',4,NULL),(9,'Marimashita','Demonio',4,NULL),(10,'SAO','Kirito',4,NULL),(11,'One Punch','Sitama',4,NULL),(12,'xupa cabra esse é o cara','show',2,NULL),(13,'xupa cabra esse é o cara','show',2,NULL),(14,'xupa cabra esse é o cara','show',2,NULL),(16,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(17,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(18,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(19,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(20,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(21,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(22,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(23,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(24,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(25,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(26,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(27,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(28,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(29,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(30,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,NULL),(31,'Sword Art Online Ep 1','Em um mundo de VRMMORPG',2,'uploads\\06-03-2020-15-01-54-bgr.png');
/*!40000 ALTER TABLE `episodios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Andriel','admin','root');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-22 22:15:16
