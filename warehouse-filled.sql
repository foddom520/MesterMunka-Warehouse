-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 16, 2026 at 09:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `arinfo`
--

CREATE TABLE `arinfo` (
  `ID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `Licit` int(11) DEFAULT 0,
  `Kep_URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `arinfo`
--

INSERT INTO `arinfo` (`ID`, `AID`, `Licit`, `Kep_URL`) VALUES
(1, 1, 150000, 'https://picsum.photos/600/400?random=1'),
(2, 2, 1000000, 'https://picsum.photos/600/400?random=2'),
(4, 4, 32000, 'https://picsum.photos/600/400?random=4'),
(5, 5, 55000, 'https://picsum.photos/600/400?random=5'),
(7, 7, 45000, 'https://picsum.photos/600/400?random=7'),
(8, 8, 95000, 'https://picsum.photos/600/400?random=8'),
(9, 9, 12000, 'https://picsum.photos/600/400?random=9'),
(10, 10, 38000, 'https://picsum.photos/600/400?random=10'),
(11, 11, 25000, 'https://picsum.photos/600/400?random=11'),
(12, 12, 65000, 'https://picsum.photos/600/400?random=12'),
(13, 13, 180000, 'https://picsum.photos/600/400?random=13'),
(14, 14, 72000, 'https://picsum.photos/600/400?random=14'),
(15, 15, 110000, 'https://picsum.photos/600/400?random=15'),
(16, 16, 210000, 'https://picsum.photos/600/400?random=16'),
(17, 17, 88000, 'https://picsum.photos/600/400?random=17'),
(18, 18, 41000, 'https://picsum.photos/600/400?random=18'),
(19, 19, 950000, 'https://picsum.photos/600/400?random=19'),
(20, 20, 52000, 'https://picsum.photos/600/400?random=20'),
(21, 21, 67000, 'https://picsum.photos/600/400?random=21'),
(22, 22, 340000, 'https://picsum.photos/600/400?random=22'),
(23, 23, 48000, 'https://picsum.photos/600/400?random=23'),
(24, 24, 155000, 'https://picsum.photos/600/400?random=24'),
(25, 25, 250000, 'https://picsum.photos/600/400?random=25'),
(26, 26, 31000, 'https://picsum.photos/600/400?random=26'),
(27, 27, 46000, 'https://picsum.photos/600/400?random=27'),
(28, 28, 14000, 'https://picsum.photos/600/400?random=28'),
(29, 29, 29000, 'https://picsum.photos/600/400?random=29'),
(30, 30, 82000, 'https://picsum.photos/600/400?random=30');

-- --------------------------------------------------------

--
-- Table structure for table `arveres`
--

CREATE TABLE `arveres` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `idopont` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `arveres`
--

INSERT INTO `arveres` (`id`, `title`, `category`, `idopont`) VALUES
(1, 'Antik Bútor Gyűjtemény', 'Bútor', '2026-03-10 10:00:00'),
(2, 'Elektronikai Csomag', 'Tech', '2026-05-15 18:30:00'),
(4, 'Retró Játékgyűjtemény', 'Hobbi', '2026-01-20 14:00:00'),
(5, 'Konyhai Gépek', 'Háztartás', '2026-03-05 09:00:00'),
(7, 'Kerékpárok és Alkatrészek', 'Sport', '2026-07-04 20:00:00'),
(8, 'Kerti Bútorok', 'Kert', '2026-02-28 11:30:00'),
(9, 'Műszaki Könyvcsomag', 'Könyv', '2026-06-25 15:00:00'),
(10, 'Festőállványok és Kellékek', 'Művészet', '2026-07-04 10:00:00'),
(11, 'Horgászfelszerelés', 'Hobbi', '2026-03-15 08:00:00'),
(12, 'Vintage Ruházat', 'Divat', '2026-05-20 17:00:00'),
(13, 'Építőanyag Maradék', 'Építkezés', '2026-07-04 15:30:00'),
(14, 'Számítógép Alkatrészek', 'Tech', '2026-02-12 21:00:00'),
(15, 'Autóalkatrészek', 'Jármű', '2026-06-01 13:00:00'),
(16, 'Hangszerek', 'Zene', '2026-07-03 19:00:00'),
(17, 'Fitnesz Gépek', 'Sport', '2026-01-05 10:00:00'),
(18, 'Képregény Gyűjtemény', 'Hobbi', '2026-06-30 22:00:00'),
(19, 'Napelem Panelek', 'Energia', '2026-07-04 09:00:00'),
(20, 'Téli Gumi Szettek', 'Jármű', '2026-03-25 11:00:00'),
(21, 'Okosotthon Eszközök', 'Tech', '2026-05-28 20:00:00'),
(22, 'Bőrgyógyászati Eszközök', 'Orvosi', '2026-07-04 14:00:00'),
(23, 'Kávégépek', 'Gasztró', '2026-02-01 07:00:00'),
(24, 'Fényképezőgépek', 'Tech', '2026-06-15 12:00:00'),
(25, 'Ékszerek és Órák', 'Divat', '2026-07-04 23:59:00'),
(26, 'Varrógépek', 'Hobbi', '2026-03-18 16:00:00'),
(27, 'Szerszámos Ládák', 'Ipari', '2026-05-05 10:00:00'),
(28, 'Szobanövények', 'Kert', '2026-07-01 11:00:00'),
(29, 'Kültéri Világítás', 'Villamosság', '2026-03-30 20:00:00'),
(30, 'Lego Készletek', 'Játék', '2026-07-04 18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jelszo` varchar(255) NOT NULL,
  `PFP` varchar(512) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `FelhasznaloNev`, `Email`, `Jelszo`, `PFP`, `Admin`) VALUES
(1, 'annarex', 'kecsk2000@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$15gGhTAo0Xi5SaeQ3RxM6Q$KgnGh6URjHEp2gSKAJ5Oq+Yo0jF+MLm+5esk/zdTzng', NULL, 0),
(2, 'admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$+4pLKsovtOKV7JKqjoZ9Qg$yBefyHOhcZlYE5S3xfCzCF/HDBPpZoLhazBWJmrH93o', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `fr-koto`
--

CREATE TABLE `fr-koto` (
  `fid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `raktar`
--

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `raktarSzama` int(11) DEFAULT NULL,
  `foglalt` tinyint(1) DEFAULT 0,
  `hatarido` date DEFAULT NULL,
  `Iranyitoszam` int(11) DEFAULT NULL,
  `Utca` varchar(255) DEFAULT NULL,
  `Hazszam` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `raktar`
--

INSERT INTO `raktar` (`id`, `raktarSzama`, `foglalt`, `hatarido`, `Iranyitoszam`, `Utca`, `Hazszam`) VALUES
(1, 101, 1, '2026-03-10', 1114, 'Vásárhelyi Pál utca', '12'),
(2, 102, 0, '2026-07-04', 1052, 'Váci utca', '5'),
(3, 103, 0, '2026-06-20', 4024, 'Piac utca', '21'),
(4, 104, 1, '2026-03-01', 6720, 'Kárász utca', '10'),
(5, 105, 0, '2026-05-12', 1111, 'Bartók Béla út', '44'),
(6, 106, 1, '2026-02-15', 1085, 'József körút', '10'),
(7, 107, 0, '2026-07-01', 3525, 'Széchenyi István utca', '2'),
(8, 108, 1, '2026-04-20', 9022, 'Dunakapu tér', '8'),
(9, 109, 0, '2026-06-30', 7621, 'Király utca', '15'),
(10, 110, 0, '2026-07-04', 6000, 'Kossuth tér', '1'),
(11, 111, 1, '2026-01-10', 1033, 'Szentendrei út', '102'),
(12, 112, 0, '2026-05-25', 1134, 'Váci út', '33'),
(13, 113, 1, '2026-03-22', 1146, 'Hermina út', '57'),
(14, 114, 0, '2026-06-12', 1061, 'Andrássy út', '10'),
(15, 115, 0, '2026-07-03', 1073, 'Erzsébet körút', '24'),
(16, 116, 1, '2026-02-28', 1092, 'Ráday utca', '11'),
(17, 117, 0, '2026-05-05', 1122, 'Városmajor utca', '4'),
(18, 118, 0, '2026-06-18', 1014, 'Úri utca', '19'),
(19, 119, 1, '2026-04-01', 1055, 'Kossuth Lajos tér', '1'),
(20, 120, 0, '2026-07-04', 1117, 'Október huszonharmadika utca', '8'),
(21, 121, 0, '2026-06-25', 1027, 'Fő utca', '66'),
(22, 122, 1, '2026-01-30', 1088, 'Rákóczi út', '5'),
(23, 123, 0, '2026-05-15', 1143, 'Hungária körút', '120'),
(24, 124, 0, '2026-07-02', 1138, 'Váci út', '178'),
(25, 125, 1, '2026-03-15', 1036, 'Lajos utca', '48'),
(26, 126, 0, '2026-06-05', 1065, 'Bajcsy-Zsilinszky út', '15'),
(27, 127, 0, '2026-07-04', 1054, 'Szabadság tér', '7'),
(28, 128, 1, '2026-02-10', 1075, 'Wesselényi utca', '18'),
(29, 129, 0, '2026-05-20', 1094, 'Ferenc körút', '2'),
(30, 130, 0, '2026-07-01', 1118, 'Rétköz utca', '5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arinfo`
--
ALTER TABLE `arinfo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_arinfo_arveres` (`AID`);

--
-- Indexes for table `arveres`
--
ALTER TABLE `arveres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD PRIMARY KEY (`fid`,`rid`,`aid`),
  ADD KEY `FK_frk_raktar` (`rid`),
  ADD KEY `FK_frk_arveres` (`aid`);

--
-- Indexes for table `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arinfo`
--
ALTER TABLE `arinfo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `arveres`
--
ALTER TABLE `arveres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arinfo`
--
ALTER TABLE `arinfo`
  ADD CONSTRAINT `FK_arinfo_arveres` FOREIGN KEY (`AID`) REFERENCES `arveres` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fr-koto`
--
ALTER TABLE `fr-koto`
  ADD CONSTRAINT `FK_frk_arveres` FOREIGN KEY (`aid`) REFERENCES `arveres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_frk_raktar` FOREIGN KEY (`rid`) REFERENCES `raktar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_frk_user` FOREIGN KEY (`fid`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
