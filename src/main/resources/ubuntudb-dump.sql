contact_requestscontact_requests-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: ubuntudb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;ubuntu

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
                             `id` bigint(20) NOT NULL AUTO_INCREMENT,
                             `name` varchar(255) NOT NULL,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Colombia'),(2,'Argentina'),(3,'Chile');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `micro_businesses`
--

DROP TABLE IF EXISTS `micro_businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `micro_businesses` (
    `deleted` TINYINT(1) DEFAULT '0',
    `managed` TINYINT(1) DEFAULT '0',
    `country_id` BIGINT(20) DEFAULT NULL,
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `province_id` BIGINT(20) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `more_information` VARCHAR(255) DEFAULT NULL,
    `name` VARCHAR(255) NOT NULL,
    `sub_title` VARCHAR(255) DEFAULT NULL,
    `category` ENUM('AGROECOLOGIA_ORGANICOS_ALIMENTACION_SALUDABLE','CONSERVACION_REGENERACION_SERVICIOS_ECOSISTEMICOS','ECONOMIA_SOCIAL_DESARROLLO_LOCAL_INCLUSION_FINANCIERA','EMPRESAS_ORGANISMOS_DE_IMPACTO_ECONOMIA_CIRCULAR') NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `FKncj5mjjf3xtx78mle9jp1y2r7` (`country_id`),
    INDEX `FK4q1vk89tnp4su6hvoelp8w71x` (`province_id`),
    INDEX `FKh8mhfpjtwthp36rkw98ql7s4k` (`user_id`),
    CONSTRAINT `FK4q1vk89tnp4su6hvoelp8w71x` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT `FKh8mhfpjtwthp36rkw98ql7s4k` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT `FKncj5mjjf3xtx78mle9jp1y2r7` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_businesses`
--

LOCK TABLES `micro_businesses` WRITE;
/*!40000 ALTER TABLE `micro_businesses` DISABLE KEYS */;
INSERT INTO `micro_businesses` (deleted, managed, country_id, created_date, province_id, user_id, description, more_information, name, sub_title, category) VALUES (0, 0, NULL, '2024-08-16 09:00:00', 1, 1, 'Sustainable environmental solutions', 'Offering eco-friendly products and services', 'EcoGreen Solutions', 'Pioneers in Eco-Friendly Solutions', 'ECONOMIA_SOCIAL_DESARROLLO_LOCAL_INCLUSION_FINANCIERA'), (0, 0, NULL, '2024-08-15 09:30:00', 2, 2, 'Innovative agricultural practices', 'Promoting organic farming techniques', 'AgroHarvest Co.', 'Leaders in Organic Farming', 'AGROECOLOGIA_ORGANICOS_ALIMENTACION_SALUDABLE'), (0, 0, NULL, '2024-03-15 09:45:00', 3, 3, 'Protecting natural habitats', 'Programs for wildlife conservation', 'ConserveNature', 'Champions of Wildlife Conservation', 'CONSERVACION_REGENERACION_SERVICIOS_ECOSISTEMICOS'), (0, 0, NULL, '2024-04-20 11:20:00', 4, 4, 'Business solutions for social good', 'Consulting for sustainable development', 'Impact Innovators', 'Advancing Social Impact through Business', 'EMPRESAS_ORGANISMOS_DE_IMPACTO_ECONOMIA_CIRCULAR'), (0, 0, NULL, '2024-05-25 08:10:00', 5, 5, 'Urban gardening and farming', 'Workshops and supplies for urban agriculture', 'GreenThumb Gardens', 'Empowering Urban Gardeners', 'ECONOMIA_SOCIAL_DESARROLLO_LOCAL_INCLUSION_FINANCIERA'), (0, 0, NULL, '2024-06-30 13:50:00', 6, 6, 'Eco-friendly farming solutions', 'Supporting local farmers with green technology', 'BioFarm Enterprises', 'Innovators in Green Farming Technology', 'AGROECOLOGIA_ORGANICOS_ALIMENTACION_SALUDABLE'), (0, 0, NULL, '2024-07-10 07:30:00', 7, 7, 'Wildlife protection initiatives', 'Education and advocacy for endangered species', 'Wildlife Warriors', 'Protectors of Endangered Species', 'CONSERVACION_REGENERACION_SERVICIOS_ECOSISTEMICOS'), (0, 0, NULL, '2024-07-10 09:30:00', 8, 8, 'Future-proof business practices', 'Consulting for long-term sustainability', 'Sustainable Futures', 'Experts in Sustainable Business Practices', 'EMPRESAS_ORGANISMOS_DE_IMPACTO_ECONOMIA_CIRCULAR'), (0, 0, NULL, '2024-07-10 17:30:00', 9, 9, 'Environmental care and awareness', 'Campaigns to increase environmental consciousness', 'Nature Nurturers', 'Promoting Environmental Awareness', 'ECONOMIA_SOCIAL_DESARROLLO_LOCAL_INCLUSION_FINANCIERA'), (0, 0, NULL, NOW(), 10, 10, 'Advanced agricultural techniques', 'Promoting sustainable farming methods', 'EcoFarm Solutions', 'Pioneers in Sustainable Agriculture', 'AGROECOLOGIA_ORGANICOS_ALIMENTACION_SALUDABLE');
/*!40000 ALTER TABLE `micro_businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinces` (
                             `country_id` bigint(20) DEFAULT NULL,
                             `id` bigint(20) NOT NULL AUTO_INCREMENT,
                             `name` varchar(255) NOT NULL,
                             PRIMARY KEY (`id`),
                             KEY `FK48p9qkti5auert2gquvn76338` (`country_id`),
                             CONSTRAINT `FK48p9qkti5auert2gquvn76338` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (1,1,'Amazonas'),(1,2,'Antioquia'),(1,3,'Arauca'),(1,4,'Atlántico'),(1,5,'Bolívar'),(1,6,'Boyacá'),(1,7,'Caldas'),(1,8,'Caquetá'),(1,9,'Casanare'),(1,10,'Cauca'),(1,11,'Cesar'),(1,12,'Chocó'),(1,13,'Córdoba'),(1,14,'Cundinamarca'),(1,15,'Guainía'),(1,16,'Guaviare'),(1,17,'Huila'),(1,18,'La Guajira'),(1,19,'Magdalena'),(1,20,'Meta'),(1,21,'Nariño'),(1,22,'Norte de Santander'),(1,23,'Putumayo'),(1,24,'Quindío'),(1,25,'Risaralda'),(1,26,'San Andrés y Providencia'),(1,27,'Santander'),(1,28,'Sucre'),(1,29,'Tolima'),(1,30,'Valle del Cauca'),(1,31,'Vaupés'),(1,32,'Vichada'),(2,33,'Buenos Aires'),(2,34,'Catamarca'),(2,35,'Chaco'),(2,36,'Chubut'),(2,37,'Córdova'),(2,38,'Corrientes'),(2,39,'Entre Ríos'),(2,40,'Formosa'),(2,41,'Jujuy'),(2,42,'La Pampa'),(2,43,'La Rioja'),(2,44,'Mendoza'),(2,45,'Misiones'),(2,46,'Neuquén'),(2,47,'Río Negro'),(2,48,'Salta'),(2,49,'San Juan'),(2,50,'San Luis'),(2,51,'Santa Cruz'),(2,52,'Santa Fe'),(2,53,'Santiago del Estero'),(2,54,'Tierra del Fuego, Antártida e Islas del Atlántico Sur'),(2,55,'Tucumán'),(3,56,'Arica'),(3,57,'Parinacota'),(3,58,'Iquique'),(3,59,'Tamarugal'),(3,60,'Tocopilla'),(3,61,'El Loa'),(3,62,'Antofagasta'),(3,63,'Chañaral'),(3,64,'Copiapó'),(3,65,'Huasco'),(3,66,'Elqui'),(3,67,'Limarí'),(3,68,'Choapa'),(3,69,'Petorca'),(3,70,'Los Andes'),(3,71,'San Felipe de Aconcagua'),(3,72,'Quillota'),(3,73,'Valparaíso'),(3,74,'San Antonio'),(3,75,'Isla de Pascua'),(3,76,'Marga Marga'),(3,77,'Chacabuco'),(3,78,'Santiago'),(3,79,'Cordillera'),(3,80,'Maipo'),(3,81,'Melipilla'),(3,82,'Talagante'),(3,83,'Cachapoal'),(3,84,'Colchagua'),(3,85,'Caro'),(3,86,'Curicó'),(3,87,'Talca'),(3,88,'Linares'),(3,89,'Cauquenes'),(3,90,'Diguillín'),(3,91,'Itata'),(3,92,'Punilla'),(3,93,'Biobío'),(3,94,'Concepción'),(3,95,'Arauco'),(3,96,'Malleco'),(3,97,'Cautín'),(3,98,'Valdivia'),(3,99,'Ranco'),(3,100,'Osorno'),(3,101,'Llanquihue'),(3,102,'Chiloé'),(3,103,'Palena'),(3,104,'Coyhaique'),(3,105,'Aysén'),(3,106,'General Carrera'),(3,107,'Capitán Prat'),(3,108,'Última Esperanza'),(3,109,'Magallanes'),(3,110,'Tierra del Fuego'),(3,111,'Antártica Chilena');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `deleted` tinyint(1) DEFAULT 0,
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `email` varchar(255) NOT NULL,
                         `first_name` varchar(255) NOT NULL,
                         `last_name` varchar(255) NOT NULL,
                         `phone` varchar(255) NOT NULL,
                         `role` varchar(10) DEFAULT 'ADMIN',
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,1,'jhan@gmail.com','Jhan','Ca','32516136513','ADMIN'),(0,2,'mariacarolinagomez88@gmail.com','Carolina','Gomez','1234567890','ADMIN'),(0,3,'alonngadea@gmail.com','Alondra','Gadea','0987654321','ADMIN'),(0,4,'walterportadev@gmail.com','Walter','Porta','1112223333','ADMIN'),(0,5,'maurojim123@gmail.com','Mauro','Jim','4445556666','ADMIN'),(0,6,'pablogalindo90@gmail.com','Pablo','Galindo','7778889999','ADMIN'),(0,7,'ubuntuorganizationproyect@gmail.com','Ubuntu','Organization','33322211151','ADMIN'),(0,8,'grace.moore@example.com','Grace','Moore','6665554444','ADMIN'),(0,9,'hank.taylor@example.com','Hank','Taylor','9998887777','ADMIN'),(0,10,'ivy.anderson@example.com','Ivy','Anderson','2223334445','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


INSERT INTO contact_requests(date_created, full_name, email, phone_number, message, state_request, micro_id) 
VALUES 
('2024-08-15', 'Juan', 'email1@example.com', '123-456-7891', 'Mensaje 1', false, 1),
('2024-08-15','david', 'email2@example.com', '123-456-7892', 'Mensaje 2', false, 2),
('2024-08-14','Pedro', 'email3@example.com', '123-456-7893', 'Mensaje 3', false, 3),
('2024-08-15','Raul', 'email4@example.com', '123-456-7894', 'Mensaje 4', false, 4),
('2024-08-15','David', 'email5@example.com', '123-456-7895', 'Mensaje 5', false, 5),
('2024-08-13','Jose', 'email6@example.com', '123-456-7896', 'Mensaje 6', false, 6),
('2024-08-15','Juan', 'email7@example.com', '123-456-7897', 'Mensaje 7', false, 7),
('2024-08-15','Nombre 8', 'email8@example.com', '123-456-7898', 'Mensaje 8', false, 9),
('2024-08-12','Pedro', 'email9@example.com', '123-456-7899', 'Mensaje 9', false, 8),
('2024-08-13','Nombre 10', 'email10@example.com', '123-456-7890', 'Mensaje 10', false, 10);

INSERT INTO publications(deleted, created_date, view_count, user_id, title, description)
VALUES
(0, '2024-08-19', 0, 6, "Inversiones Éticas: Más que ganancias", "Las decisiones financieras han trascendido la mera maximización del rendimiento. Actualmente, muchos inversores desean que sus decisiones reflejen sus valores éticos y morales, dando lugar a las inversiones éticas o sostenibles.\n\nEstas no solo evitan sectores polémicos como el tabaco o las armas; buscan respaldar empresas y proyectos que beneficien positivamente a la sociedad y al medio ambiente. Estas empresas suelen adherirse a altos estándares de responsabilidad social, considerando tanto a accionistas como a las comunidades en las que operan.\n\nEl atractivo de las inversiones éticas radica en la posibilidad de generar un impacto positivo con el dinero invertido. Apoyando a empresas pioneras en energías renovables, que fomentan la igualdad de género o que practican la equidad laboral, los inversores no solo buscan ganancias, sino también cambios beneficiosos en el mundo.\n\nContrario a lo que algunos podrían pensar, las inversiones éticas pueden ofrecer rendimientos competitivos. La demanda de soluciones sostenibles está en aumento, y las empresas que lideran en este ámbito suelen tener una ventaja competitiva a largo plazo.\n\nNo obstante, es esencial investigar adecuadamente. No todas las empresas que se promocionan como 'sostenibles' cumplen con estos criterios. Certificaciones, como los Principios de Inversión Responsable de las Naciones Unidas, son útiles para discernir el compromiso real de una empresa con la sostenibilidad.\n\nEn conclusión, las inversiones éticas ofrecen la oportunidad de unir capital y valores. Al buscar un impacto positivo más allá de los rendimientos, contribuimos a un futuro más equitativo y sostenible.");

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-11 10:30:51

