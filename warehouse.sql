CREATE DATABASE IF NOT EXISTS `warehouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `warehouse`;

-- 1. Table: felhasznalo (Required for login, register, and profile routes)
DROP TABLE IF EXISTS `felhasznalo`;
CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `FelhasznaloNev` varchar(255) NOT NULL UNIQUE,
  `Email` varchar(255) NOT NULL UNIQUE,
  `Jelszo` varchar(255) NOT NULL,
  `PFP` varchar(512) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 2. Table: raktar (Required for /raktar and /arveres routes)
DROP TABLE IF EXISTS `raktar`;
CREATE TABLE `raktar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raktarSzama` int(11) DEFAULT NULL, -- Added to support filling.sql logic
  `foglalt` tinyint(1) DEFAULT 0,
  `hatarido` date DEFAULT NULL,
  `Iranyitoszam` int(11) DEFAULT NULL,
  `Utca` varchar(255) DEFAULT NULL,
  `Hazszam` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 3. Table: arveres (Required for /arveres and /arveresinfo routes)
DROP TABLE IF EXISTS `arveres`;
CREATE TABLE `arveres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL, -- Added to support filling.sql
  `category` varchar(100) DEFAULT NULL, -- Added to support filling.sql
  `idopont` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 4. Table: arinfo (Required for /arveresinfo and /arveresinfo/update routes)
DROP TABLE IF EXISTS `arinfo`;
CREATE TABLE `arinfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AID` int(11) NOT NULL,
  `Licit` int(11) DEFAULT 0,
  `Kep_URL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_arinfo_arveres` FOREIGN KEY (`AID`) REFERENCES `arveres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- 5. Junction Table: fr-koto (From your old dump, keeps relationships intact)
DROP TABLE IF EXISTS `fr-koto`;
CREATE TABLE `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  PRIMARY KEY (`fid`,`rid`,`aid`),
  CONSTRAINT `FK_frk_user` FOREIGN KEY (`fid`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_frk_raktar` FOREIGN KEY (`rid`) REFERENCES `raktar` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_frk_arveres` FOREIGN KEY (`aid`) REFERENCES `arveres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;