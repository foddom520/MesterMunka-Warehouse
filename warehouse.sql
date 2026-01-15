-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2026. Jan 15. 12:00
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `arveres`
--

INSERT INTO `arveres` (`id`, `idopont`) VALUES
(1, '2025-11-20 14:00:00'),
(2, '2025-11-21 10:00:00'),
(3, '2025-11-22 16:00:00'),
(4, '2025-11-23 11:00:00'),
(5, '2025-11-24 09:00:00'),
(6, '2025-11-25 15:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

DROP TABLE IF EXISTS `felhasznalo`;
CREATE TABLE IF NOT EXISTS `felhasznalo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `FelhasznaloNev` varchar(16) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `PFP` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `felhasznalo` (`FelhasznaloNev`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `FelhasznaloNev`, `Email`, `Jelszo`, `PFP`) VALUES
(1, 'kovacsbela', 'kovacs.bela@email.com', '$2b$10$abc123def456ghi789jkl', ''),
(2, 'szaboanna', 'szabo.anna@email.com', '$2b$10$mno123pqr456stu789vwx', ''),
(3, 'nagypeter', 'nagy.peter@email.com', '$2b$10$yzab123cde456fgh789ijk', ''),
(4, 'kisseva', 'kiss.eva@email.com', '$2b$10$lmn123opq456rst789uvw', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo_szerep`
--

DROP TABLE IF EXISTS `felhasznalo_szerep`;
CREATE TABLE IF NOT EXISTS `felhasznalo_szerep` (
  `fid` int(11) NOT NULL,
  `szerep_id` int(11) NOT NULL,
  KEY `fid` (`fid`),
  KEY `szerep_id` (`szerep_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fr-koto`
--

DROP TABLE IF EXISTS `fr-koto`;
CREATE TABLE IF NOT EXISTS `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  PRIMARY KEY (`fid`,`rid`,`aid`),
  KEY `FK_frk_raktar` (`rid`),
  KEY `FK_frk_arveres` (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `fr-koto`
--

INSERT INTO `fr-koto` (`fid`, `rid`, `aid`) VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 3),
(2, 6, 6),
(3, 4, 4),
(4, 5, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

DROP TABLE IF EXISTS `raktar`;
CREATE TABLE IF NOT EXISTS `raktar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foglalt` tinyint(1) NOT NULL,
  `hatarido` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `foglalt`, `hatarido`) VALUES
(1, 1, '2025-12-31'),
(2, 0, '2025-11-30'),
(3, 1, '2025-10-15'),
(4, 0, '2025-09-20'),
(5, 1, '2025-08-25'),
(6, 0, '2025-07-30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerep_lista`
--

DROP TABLE IF EXISTS `szerep_lista`;
CREATE TABLE IF NOT EXISTS `szerep_lista` (
  `id` int(11) NOT NULL,
  `szerep` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD CONSTRAINT `FK_frk_arveres` FOREIGN KEY (`aid`) REFERENCES `arveres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_frk_felhasznalo` FOREIGN KEY (`fid`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_frk_raktar` FOREIGN KEY (`rid`) REFERENCES `raktar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
