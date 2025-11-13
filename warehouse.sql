-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Nov 13. 11:58
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `arveres`
--

CREATE TABLE `arveres` (
  `id` int(11) NOT NULL,
  `idopont` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `VNev` varchar(20) NOT NULL,
  `Knev` varchar(20) NOT NULL,
  `FelhasznaloNev` varchar(16) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fr-koto`
--

CREATE TABLE `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `foglalt` tinyint(1) NOT NULL,
  `hatarido` date NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `arveres`
--
ALTER TABLE `arveres`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD KEY `FK-fid-id` (`fid`),
  ADD KEY `FK-rid-id` (`rid`);

--
-- A tábla indexei `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK-aid-id` (`aid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `arveres`
--
ALTER TABLE `arveres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
