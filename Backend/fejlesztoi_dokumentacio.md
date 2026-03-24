# Fejlesztői Dokumentáció - Server.js

## Áttekintés

Ez a dokumentáció a `server.js` fájlhoz tartozik, amely egy Node.js Express szerver alkalmazást valósít meg. Az alkalmazás egy raktárkezelő rendszer backend része, amely felhasználói autentikációt, profilkezelést, raktárinformációkat és árverési funkciókat biztosít.

## Technológiai Stack

- **Node.js**: JavaScript runtime környezet.
- **Express.js**: Web keretrendszer API végpontok kezelésére.
- **MySQL2**: MySQL adatbázis kapcsolat.
- **Argon2**: Jelszavak biztonságos hashelésére.
- **CORS**: Cross-Origin Resource Sharing engedélyezése.
- **Dotenv**: Környezeti változók kezelése.

## Függőségek

A projekt a következő npm csomagokat használja (lásd `package.json`):

- `express`: ^4.x
- `cors`: ^2.x
- `mysql2`: ^3.x
- `argon2`: ^0.x
- `dotenv`: ^16.x

Telepítés: `npm install`

## Adatbázis Konfiguráció

Az alkalmazás MySQL adatbázishoz csatlakozik. A kapcsolat konfigurációja:

- **Host**: localhost vagy `process.env.DB_Host`
- **User**: root vagy `process.env.DB_User`
- **Password**: üres vagy `process.env.DB_Password`
- **Database**: warehouse vagy `process.env.DB_Name`
- **Port**: 3307 vagy `process.env.DB_Port` / `process.env.DB_Port2`

Ajánlott környezeti változók használata `.env` fájlban a biztonság érdekében.

## API Végpontok

### 1. Bejelentkezés (POST /login)
- **Leírás**: Felhasználó autentikáció email és jelszó alapján.
- **Bemenet**: `{ Email: string, Jelszo: string }`
- **Kimenet**: Sikeres bejelentkezés esetén "Sikeres bejelentkezés", különben hibaüzenet.
- **Biztonság**: Jelszó ellenőrzés Argon2 hasheléssel.

### 2. Regisztráció (POST /register)
- **Leírás**: Új felhasználó regisztráció.
- **Bemenet**: `{ Felhasznalonev: string, Email: string, Jelszo: string }`
- **Kimenet**: Sikeres regisztráció esetén "Sikeres regisztráció", különben adatbázis hiba.
- **Biztonság**: Jelszó hashelés Argon2-vel.

### 3. Jelszó Módosítás (PATCH /p/jelszo)
- **Leírás**: Felhasználó jelszavának módosítása.
- **Bemenet**: `{ UjJelszo: string, Felhasznalonev: string }`
- **Kimenet**: Sikeres módosítás esetén "Sikeres jelszó módosítás".
- **Megjegyzés**: Tesztelni szükséges.

### 4. Profil Törlés (DELETE /p/torles)
- **Leírás**: Felhasználói profil törlése.
- **Bemenet**: `{ Felhasznalonev: string }`
- **Kimenet**: Sikeres törlés esetén "Sikeres profil törlés".
- **Megjegyzés**: Tesztelni szükséges.

### 5. Profil Információk (GET /p/info)
- **Leírás**: Összes felhasználó neve és email címének lekérdezése.
- **Bemenet**: Nincs.
- **Kimenet**: JSON tömb felhasználói adatokkal.

### 6. Profilnév Módosítás (POST /p/mod)
- **Leírás**: Felhasználónév módosítása.
- **Bemenet**: `{ Felhasznalonev: string, RegiFnev: string }`
- **Kimenet**: Sikeres módosítás esetén "Sikeres módosítás".
- **Megjegyzés**: Tesztelni szükséges.

### 7. Raktár Információk (GET /raktar)
- **Leírás**: Raktárak foglaltsága, határideje és címeinek lekérdezése.
- **Bemenet**: Nincs.
- **Kimenet**: JSON tömb raktár adatokkal.

### 8. Árverések Lekérdezése (GET /arveres)
- **Leírás**: Összes árverés és kapcsolódó raktár információk lekérdezése.
- **Bemenet**: Nincs.
- **Kimenet**: JSON tömb árverési adatokkal.

### 9. Árverés Részletek (GET /arveresinfo/:id)
- **Leírás**: Egy adott árverés részletes információi.
- **Bemenet**: URL paraméter: `id` (árverés ID).
- **Kimenet**: JSON tömb árverés információkkal.

### 10. Licit Frissítés (PATCH /arveresinfo/update)
- **Leírás**: Árverési licit frissítése minimum növelési követelménnyel.
- **Bemenet**: `{ aid: number, licit: number }`
- **Kimenet**: Sikeres licit esetén "Sikeres licit!", különben hibaüzenet.
- **Logika**: Minimum licit = jelenlegi licit + min(10% jelenlegi, 50).

## Biztonsági Megfontolások

- **Jelszavak**: Argon2 hasheléssel tárolva, soha nem plain text-ben.
- **SQL Injection Védelme**: Paraméterezett lekérdezések használata.
- **CORS**: Engedélyezve minden origin-ra (fejlesztési célból, élesben korlátozni kell).
- **Hibakezelés**: Általános adatbázis hibák kezelése, de részletes hibaüzenetek kerülendők élesben.

## Tesztelés

A kódban több végpont is "tesztelni" kommenttel van ellátva. Ajánlott egységteszteket írni minden API végponthoz, valamint integrációs teszteket az adatbázis műveletekre.

Például:
- Bejelentkezés/regisztráció flow tesztelése.
- Profil módosítások tesztelése.
- Árverési logika validálása.

## Futtatás

1. Függőségek telepítése: `npm install`
2. Környezeti változók beállítása `.env` fájlban.
3. Adatbázis elindítása és séma létrehozása.
4. Szerver indítása: `node server.js`
5. Szerver fut a 3000-es porton.

## Fejlesztési Jegyzetek

- A kód magyar változóneveket használ, ami konzisztens a projekttel.
- Hibaüzenetek részben angolul, részben magyarul vannak.

## Kapcsolódó Fájlok

- `package.json`: Projekt függőségek és scriptek.
- `.env`: Környezeti változók (nem verziókezelt).