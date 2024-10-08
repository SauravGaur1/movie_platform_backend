-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: world
-- ------------------------------------------------------
-- Server version	8.0.38

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

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `States`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `States` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` mediumint unsigned NOT NULL,
  `country_code` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fips_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iso2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `country_region` (`country_id`),
  CONSTRAINT `country_region_final` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (4006,'Meghalaya',101,'IN','18','ML','state',25.46703080,91.36621600,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4007,'Haryana',101,'IN','10','HR','state',29.05877570,76.08560100,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4008,'Maharashtra',101,'IN','16','MH','state',19.75147980,75.71388840,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4009,'Goa',101,'IN','33','GA','state',15.29932650,74.12399600,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4010,'Manipur',101,'IN','17','MN','state',24.66371730,93.90626880,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4011,'Puducherry',101,'IN','22','PY','Union territory',11.94159150,79.80831330,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4012,'Telangana',101,'IN','40','TG','state',18.11243720,79.01929970,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4013,'Odisha',101,'IN','21','OR','state',20.95166580,85.09852360,'2019-10-05 17:48:57','2022-10-06 06:39:54'),(4014,'Rajasthan',101,'IN','24','RJ','state',27.02380360,74.21793260,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4015,'Punjab',101,'IN','23','PB','state',31.14713050,75.34121790,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4016,'Uttarakhand',101,'IN','39','UK','state',30.06675300,79.01929970,'2019-10-05 17:48:57','2024-02-16 14:32:08'),(4017,'Andhra Pradesh',101,'IN','02','AP','state',15.91289980,79.73998750,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4018,'Nagaland',101,'IN','20','NL','state',26.15843540,94.56244260,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4019,'Lakshadweep',101,'IN','14','LD','Union territory',10.32802650,72.78463360,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4020,'Himachal Pradesh',101,'IN','11','HP','state',31.10482940,77.17339010,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4021,'Delhi',101,'IN','07','DL','Union territory',28.70405920,77.10249020,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4022,'Uttar Pradesh',101,'IN','36','UP','state',26.84670880,80.94615920,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4023,'Andaman and Nicobar Islands',101,'IN','01','AN','Union territory',11.74008670,92.65864010,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4024,'Arunachal Pradesh',101,'IN','30','AR','state',28.21799940,94.72775280,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4025,'Jharkhand',101,'IN','38','JH','state',23.61018080,85.27993540,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4026,'Karnataka',101,'IN','19','KA','state',15.31727750,75.71388840,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4027,'Assam',101,'IN','03','AS','state',26.20060430,92.93757390,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4028,'Kerala',101,'IN','13','KL','state',10.85051590,76.27108330,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4029,'Jammu and Kashmir',101,'IN','12','JK','Union territory',33.27783900,75.34121790,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4030,'Gujarat',101,'IN','09','GJ','state',22.25865200,71.19238050,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4031,'Chandigarh',101,'IN','05','CH','Union territory',30.73331480,76.77941790,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4033,'Dadra and Nagar Haveli and Daman and Diu',101,'IN','32','DH','Union territory',20.39737360,72.83279910,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4034,'Sikkim',101,'IN','29','SK','state',27.53297180,88.51221780,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4035,'Tamil Nadu',101,'IN','25','TN','state',11.12712250,78.65689420,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4036,'Mizoram',101,'IN','31','MZ','state',23.16454300,92.93757390,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4037,'Bihar',101,'IN','34','BR','state',25.09607420,85.31311940,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4038,'Tripura',101,'IN','26','TR','state',23.94084820,91.98815270,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4039,'Madhya Pradesh',101,'IN','35','MP','state',22.97342290,78.65689420,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4040,'Chhattisgarh',101,'IN','37','CT','state',21.27865670,81.86614420,'2019-10-05 17:48:57','2022-03-13 07:27:52'),(4852,'Ladakh',101,'IN',NULL,'LA','Union territory',34.22684750,77.56194190,'2019-10-05 17:48:57','2022-03-13 10:39:54'),(4853,'West Bengal',101,'IN','28','WB','state',22.98675690,87.85497550,'2019-10-05 17:48:57','2022-03-13 07:27:52');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 15:05:17
