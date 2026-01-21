-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2026. Jan 21. 11:12
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
CREATE TABLE `arveres` (
  `id` int(11) NOT NULL,
  `idopont` datetime NOT NULL,
  `JelentkezID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `arveres`
--

INSERT INTO `arveres` (`id`, `idopont`, `JelentkezID`) VALUES
(1, '2025-11-20 14:00:00', 0),
(2, '2025-11-21 10:00:00', 0),
(3, '2025-11-22 16:00:00', 0),
(4, '2025-11-23 11:00:00', 0),
(5, '2025-11-24 09:00:00', 0),
(6, '2025-11-25 15:00:00', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

DROP TABLE IF EXISTS `felhasznalo`;
CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(16) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `PFP` varchar(512) NOT NULL,
  `Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `FelhasznaloNev`, `Email`, `Jelszo`, `PFP`, `Admin`) VALUES
(1, 'kovacsbela', 'kovacs.bela@email.com', '$2b$10$abc123def456ghi789jkl', '', 0),
(2, 'szaboanna', 'szabo.anna@email.com', '$2b$10$mno123pqr456stu789vwx', '', 0),
(3, 'nagypeter', 'nagy.peter@email.com', '$2b$10$yzab123cde456fgh789ijk', '', 0),
(4, 'kisseva', 'kiss.eva@email.com', '$2b$10$lmn123opq456rst789uvw', '', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fr-koto`
--

DROP TABLE IF EXISTS `fr-koto`;
CREATE TABLE `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL
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
CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `foglalt` tinyint(1) NOT NULL,
  `hatarido` date NOT NULL,
  `Iranyitoszam` int(11) NOT NULL,
  `Hazszam` int(11) NOT NULL,
  `Utca` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `foglalt`, `hatarido`, `Iranyitoszam`, `Hazszam`, `Utca`) VALUES
(1, 1, '2025-12-31', 0, 0, ''),
(2, 0, '2025-11-30', 0, 0, ''),
(3, 1, '2025-10-15', 0, 0, ''),
(4, 0, '2025-09-20', 0, 0, ''),
(5, 1, '2025-08-25', 0, 0, ''),
(6, 0, '2025-07-30', 0, 0, '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `arveres`
--
ALTER TABLE `arveres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JelentkezID` (`JelentkezID`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `felhasznalo` (`FelhasznaloNev`);

--
-- A tábla indexei `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD PRIMARY KEY (`fid`,`rid`,`aid`),
  ADD KEY `FK_frk_raktar` (`rid`),
  ADD KEY `FK_frk_arveres` (`aid`);

--
-- A tábla indexei `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `arveres`
--
ALTER TABLE `arveres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD CONSTRAINT `fr-koto_ibfk_2` FOREIGN KEY (`fid`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fr-koto_ibfk_3` FOREIGN KEY (`rid`) REFERENCES `raktar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fr-koto_ibfk_4` FOREIGN KEY (`aid`) REFERENCES `arveres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
