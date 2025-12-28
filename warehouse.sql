DROP DATABASE IF EXISTS `warehouse`;
CREATE DATABASE `warehouse`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE `warehouse`;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `felhasznalo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `VNev` VARCHAR(20) NOT NULL,
  `Knev` VARCHAR(20) NOT NULL,
  `FelhasznaloNev` VARCHAR(16) NOT NULL,
  `Email` VARCHAR(255) NOT NULL UNIQUE,
  `Jelszo` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `arveres` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `idopont` DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `raktar` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `foglalt` TINYINT(1) NOT NULL,
  `hatarido` DATE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `fr-koto` (
  `fid` INT NOT NULL,
  `rid` INT NOT NULL,
  `aid` INT NOT NULL,
  PRIMARY KEY (`fid`, `rid`, `aid`),

  CONSTRAINT `FK_frk_felhasznalo`
    FOREIGN KEY (`fid`) REFERENCES `felhasznalo`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `FK_frk_raktar`
    FOREIGN KEY (`rid`) REFERENCES `raktar`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `FK_frk_arveres`
    FOREIGN KEY (`aid`) REFERENCES `arveres`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `felhasznalo`
(`id`, `VNev`, `Knev`, `FelhasznaloNev`, `Email`, `Jelszo`)
VALUES
(1, 'Kovács', 'Béla', 'kovacsbela', 'kovacs.bela@email.com', '$2b$10$abc123def456ghi789jkl'),
(2, 'Szabó', 'Anna', 'szaboanna', 'szabo.anna@email.com', '$2b$10$mno123pqr456stu789vwx'),
(3, 'Nagy', 'Péter', 'nagypeter', 'nagy.peter@email.com', '$2b$10$yzab123cde456fgh789ijk'),
(4, 'Kiss', 'Éva', 'kisseva', 'kiss.eva@email.com', '$2b$10$lmn123opq456rst789uvw');

INSERT INTO `arveres`
(`id`, `idopont`)
VALUES
(1, '2025-11-20 14:00:00'),
(2, '2025-11-21 10:00:00'),
(3, '2025-11-22 16:00:00'),
(4, '2025-11-23 11:00:00'),
(5, '2025-11-24 09:00:00'),
(6, '2025-11-25 15:00:00');

INSERT INTO `raktar`
(`id`, `foglalt`, `hatarido`)
VALUES
(1, 1, '2025-12-31'),
(2, 0, '2025-11-30'),
(3, 1, '2025-10-15'),
(4, 0, '2025-09-20'),
(5, 1, '2025-08-25'),
(6, 0, '2025-07-30');

INSERT INTO `fr-koto`
(`fid`, `rid`, `aid`)
VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 3),
(3, 4, 4),
(4, 5, 5),
(2, 6, 6);