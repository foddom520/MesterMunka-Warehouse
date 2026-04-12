USE `warehouse`;

DROP TABLE IF EXISTS `arinfo`;
DROP TABLE IF EXISTS `arveres`;
DROP TABLE IF EXISTS `raktar`;

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raktarSzama` int(11) NOT NULL, -- This matches row.raktarSzama in React
  `foglalt` tinyint(1) DEFAULT 0,
  `hatarido` date DEFAULT NULL,
  `Iranyitoszam` int(11) DEFAULT NULL,
  `Utca` varchar(255) DEFAULT NULL,
  `Hazszam` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- Re-creating other tables to maintain foreign keys
CREATE TABLE `arveres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `idopont` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `arinfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AID` int(11) NOT NULL,
  `Licit` int(11) DEFAULT 0,
  `Kep_URL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_arinfo_arveres` FOREIGN KEY (`AID`) REFERENCES `arveres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;