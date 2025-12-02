-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Dec 02. 09:58
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `warehouse`
--
CREATE DATABASE IF NOT EXISTS `warehouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `warehouse`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `arveres`
--

DROP TABLE IF EXISTS `arveres`;
CREATE TABLE IF NOT EXISTS `arveres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idopont` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

DROP TABLE IF EXISTS `felhasznalo`;
CREATE TABLE IF NOT EXISTS `felhasznalo` (
  `VNev` varchar(20) NOT NULL,
  `Knev` varchar(20) NOT NULL,
  `FelhasznaloNev` varchar(16) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unq` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fr-koto`
--

DROP TABLE IF EXISTS `fr-koto`;
CREATE TABLE IF NOT EXISTS `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  KEY `FK-fid-id` (`fid`),
  KEY `FK-rid-id` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

DROP TABLE IF EXISTS `raktar`;
CREATE TABLE IF NOT EXISTS `raktar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foglalt` tinyint(1) NOT NULL,
  `hatarido` date NOT NULL,
  `aid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK-aid-id` (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `arveres`
--
ALTER TABLE `arveres`
  ADD CONSTRAINT `arveres_ibfk_1` FOREIGN KEY (`id`) REFERENCES `raktar` (`aid`);

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`id`) REFERENCES `fr-koto` (`fid`);

--
-- Megkötések a táblához `raktar`
--
ALTER TABLE `raktar`
  ADD CONSTRAINT `raktar_ibfk_1` FOREIGN KEY (`id`) REFERENCES `fr-koto` (`rid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
