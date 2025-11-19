ALTER TABLE `felhasznalo` DROP FOREIGN KEY `felhasznalo_ibfk_1`;
ALTER TABLE `raktar` DROP FOREIGN KEY `raktar_ibfk_1`;
ALTER TABLE `arveres` DROP FOREIGN KEY `arveres_ibfk_1`;

ALTER TABLE `fr-koto` ADD CONSTRAINT `FK_fr_koto_felhasznalo` FOREIGN KEY (`fid`) REFERENCES `felhasznalo`(`id`);
ALTER TABLE `fr-koto` ADD CONSTRAINT `FK_fr_koto_raktar` FOREIGN KEY (`rid`) REFERENCES `raktar`(`id`);
ALTER TABLE `raktar` ADD CONSTRAINT `FK_raktar_arveres` FOREIGN KEY (`aid`) REFERENCES `arveres`(`id`);

INSERT INTO `felhasznalo` (`VNev`, `Knev`, `FelhasznaloNev`, `Email`, `Jelszo`, `id`) VALUES
('Kovács', 'Béla', 'kovacsbela', 'kovacs.bela@email.com', '$2b$10$abc123def456ghi789jkl', 1),
('Szabó', 'Anna', 'szaboanna', 'szabo.anna@email.com', '$2b$10$mno123pqr456stu789vwx', 2),
('Nagy', 'Péter', 'nagypeter', 'nagy.peter@email.com', '$2b$10$yzab123cde456fgh789ijk', 3),
('Kiss', 'Éva', 'kisseva', 'kiss.eva@email.com', '$2b$10$lmn123opq456rst789uvw', 4);

INSERT INTO `arveres` (`id`, `idopont`) VALUES
(1, '2025-11-20 14:00:00'),
(2, '2025-11-21 10:00:00'),
(3, '2025-11-22 16:00:00'),
(4, '2025-11-23 11:00:00'),
(5, '2025-11-24 09:00:00'),
(6, '2025-11-25 15:00:00');

INSERT INTO `raktar` (`id`, `foglalt`, `hatarido`, `aid`) VALUES
(1, 1, '2025-12-31', 1),
(2, 0, '2025-11-30', 2),
(3, 1, '2025-10-15', 3),
(4, 0, '2025-09-20', 4),
(5, 1, '2025-08-25', 5),
(6, 0, '2025-07-30', 6);

INSERT INTO `fr-koto` (`fid`, `rid`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(2, 6);