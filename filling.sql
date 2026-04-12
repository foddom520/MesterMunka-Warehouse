USE `warehouse`;

INSERT INTO `raktar` (`raktarSzama`, `foglalt`, `hatarido`, `Iranyitoszam`, `Utca`, `Hazszam`) VALUES
(101, 1, '2026-03-10', 1114, 'Vásárhelyi Pál utca', '12'), (102, 0, '2026-07-04', 1052, 'Váci utca', '5'),
(103, 0, '2026-06-20', 4024, 'Piac utca', '21'), (104, 1, '2026-03-01', 6720, 'Kárász utca', '10'),
(105, 0, '2026-05-12', 1111, 'Bartók Béla út', '44'), (106, 1, '2026-02-15', 1085, 'József körút', '10'),
(107, 0, '2026-07-01', 3525, 'Széchenyi István utca', '2'), (108, 1, '2026-04-20', 9022, 'Dunakapu tér', '8'),
(109, 0, '2026-06-30', 7621, 'Király utca', '15'), (110, 0, '2026-07-04', 6000, 'Kossuth tér', '1'),
(111, 1, '2026-01-10', 1033, 'Szentendrei út', '102'), (112, 0, '2026-05-25', 1134, 'Váci út', '33'),
(113, 1, '2026-03-22', 1146, 'Hermina út', '57'), (114, 0, '2026-06-12', 1061, 'Andrássy út', '10'),
(115, 0, '2026-07-03', 1073, 'Erzsébet körút', '24'), (116, 1, '2026-02-28', 1092, 'Ráday utca', '11'),
(117, 0, '2026-05-05', 1122, 'Városmajor utca', '4'), (118, 0, '2026-06-18', 1014, 'Úri utca', '19'),
(119, 1, '2026-04-01', 1055, 'Kossuth Lajos tér', '1'), (120, 0, '2026-07-04', 1117, 'Október huszonharmadika utca', '8'),
(121, 0, '2026-06-25', 1027, 'Fő utca', '66'), (122, 1, '2026-01-30', 1088, 'Rákóczi út', '5'),
(123, 0, '2026-05-15', 1143, 'Hungária körút', '120'), (124, 0, '2026-07-02', 1138, 'Váci út', '178'),
(125, 1, '2026-03-15', 1036, 'Lajos utca', '48'), (126, 0, '2026-06-05', 1065, 'Bajcsy-Zsilinszky út', '15'),
(127, 0, '2026-07-04', 1054, 'Szabadság tér', '7'), (128, 1, '2026-02-10', 1075, 'Wesselényi utca', '18'),
(129, 0, '2026-05-20', 1094, 'Ferenc körút', '2'), (130, 0, '2026-07-01', 1118, 'Rétköz utca', '5');

-- 2. INSERT 30 AUCTIONS (15 Expired, 15 Active/Ending July 4)
INSERT INTO `arveres` (`title`, `category`, `idopont`) VALUES
('Antik Bútor Gyűjtemény', 'Bútor', '2026-03-10 10:00:00'), ('Elektronikai Csomag', 'Tech', '2026-05-15 18:30:00'),
('Ipari Szerszámok', 'Ipari', '2026-07-04 12:00:00'), ('Retró Játékgyűjtemény', 'Hobbi', '2026-01-20 14:00:00'),
('Konyhai Gépek', 'Háztartás', '2026-03-05 09:00:00'), ('Irodai Felszerelés', 'Iroda', '2026-06-10 16:00:00'),
('Kerékpárok és Alkatrészek', 'Sport', '2026-07-04 20:00:00'), ('Kerti Bútorok', 'Kert', '2026-02-28 11:30:00'),
('Műszaki Könyvcsomag', 'Könyv', '2026-06-25 15:00:00'), ('Festőállványok és Kellékek', 'Művészet', '2026-07-04 10:00:00'),
('Horgászfelszerelés', 'Hobbi', '2026-03-15 08:00:00'), ('Vintage Ruházat', 'Divat', '2026-05-20 17:00:00'),
('Építőanyag Maradék', 'Építkezés', '2026-07-04 15:30:00'), ('Számítógép Alkatrészek', 'Tech', '2026-02-12 21:00:00'),
('Autóalkatrészek', 'Jármű', '2026-06-01 13:00:00'), ('Hangszerek', 'Zene', '2026-07-03 19:00:00'),
('Fitnesz Gépek', 'Sport', '2026-01-05 10:00:00'), ('Képregény Gyűjtemény', 'Hobbi', '2026-06-30 22:00:00'),
('Napelem Panelek', 'Energia', '2026-07-04 09:00:00'), ('Téli Gumi Szettek', 'Jármű', '2026-03-25 11:00:00'),
('Okosotthon Eszközök', 'Tech', '2026-05-28 20:00:00'), ('Bőrgyógyászati Eszközök', 'Orvosi', '2026-07-04 14:00:00'),
('Kávégépek', 'Gasztró', '2026-02-01 07:00:00'), ('Fényképezőgépek', 'Tech', '2026-06-15 12:00:00'),
('Ékszerek és Órák', 'Divat', '2026-07-04 23:59:00'), ('Varrógépek', 'Hobbi', '2026-03-18 16:00:00'),
('Szerszámos Ládák', 'Ipari', '2026-05-05 10:00:00'), ('Szobanövények', 'Kert', '2026-07-01 11:00:00'),
('Kültéri Világítás', 'Villamosság', '2026-03-30 20:00:00'), ('Lego Készletek', 'Játék', '2026-07-04 18:00:00');

-- 3. INSERT 30 BID INFO (Linking each auction to a starting price and image)
INSERT INTO `arinfo` (`AID`, `Licit`, `Kep_URL`) VALUES
(1, 150000, 'https://picsum.photos/600/400?random=1'), (2, 85000, 'https://picsum.photos/600/400?random=2'),
(3, 420000, 'https://picsum.photos/600/400?random=3'), (4, 32000, 'https://picsum.photos/600/400?random=4'),
(5, 55000, 'https://picsum.photos/600/400?random=5'), (6, 120000, 'https://picsum.photos/600/400?random=6'),
(7, 45000, 'https://picsum.photos/600/400?random=7'), (8, 95000, 'https://picsum.photos/600/400?random=8'),
(9, 12000, 'https://picsum.photos/600/400?random=9'), (10, 38000, 'https://picsum.photos/600/400?random=10'),
(11, 25000, 'https://picsum.photos/600/400?random=11'), (12, 65000, 'https://picsum.photos/600/400?random=12'),
(13, 180000, 'https://picsum.photos/600/400?random=13'), (14, 72000, 'https://picsum.photos/600/400?random=14'),
(15, 110000, 'https://picsum.photos/600/400?random=15'), (16, 210000, 'https://picsum.photos/600/400?random=16'),
(17, 88000, 'https://picsum.photos/600/400?random=17'), (18, 41000, 'https://picsum.photos/600/400?random=18'),
(19, 950000, 'https://picsum.photos/600/400?random=19'), (20, 52000, 'https://picsum.photos/600/400?random=20'),
(21, 67000, 'https://picsum.photos/600/400?random=21'), (22, 340000, 'https://picsum.photos/600/400?random=22'),
(23, 48000, 'https://picsum.photos/600/400?random=23'), (24, 155000, 'https://picsum.photos/600/400?random=24'),
(25, 250000, 'https://picsum.photos/600/400?random=25'), (26, 31000, 'https://picsum.photos/600/400?random=26'),
(27, 46000, 'https://picsum.photos/600/400?random=27'), (28, 14000, 'https://picsum.photos/600/400?random=28'),
(29, 29000, 'https://picsum.photos/600/400?random=29'), (30, 82000, 'https://picsum.photos/600/400?random=30');