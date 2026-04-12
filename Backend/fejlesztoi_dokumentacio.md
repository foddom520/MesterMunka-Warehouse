# Fejlesztői Dokumentáció - MesterMunka Warehouse

## 1. Projekt Áttekintés

A **Bid & Lock** egy online raktár-árverési platform. A rendszer lehetővé teszi a felhasználók számára, hogy:
- Regisztráljanak és bejelentkezzenek
- Megtekintsenek elérhető raktárhelyeket
- Árverésen vessenek részt és licitálhassanak
- Profiljukat kezeljék és módosítsák

Az alkalmazás teljes stack fejlesztés: React frontend + Node.js Express backend + MySQL adatbázis.

---

## 3. Technológiai Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js** (^5.1.0): Web keretrendszer
- **MySQL2** (^3.15.3): Adatbázis connector
- **Argon2** (^0.44.0): Jelszó hashelés
- **CORS** (^2.8.5): Cross-origin kérések
- **Dotenv** (^17.2.3): Környezeti változók
- **Nodemon** (^3.1.11): Desenvolvimento auto-restart

### Frontend
- **React** (^19.1.1): UI keretrendszer
- **React Router DOM** (^7.9.6): Routing
- **React Bootstrap** (^2.10.10): UI komponensek
- **Bootstrap** (^5.3.8): CSS keretrendszer
- **React Icons** (^5.5.0): IkonLibrery
- **Vite** (^7.1.7): Build tool
- **ESLint** (^9.36.0): Kód minőség

---

## 4. Adatbázis Séma

### Táblák

#### `felhasznalo` - Felhasználók
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- FelhasznaloNev (VARCHAR(16), UNIQUE)
- Email (VARCHAR(255), UNIQUE)
- Jelszo (VARCHAR(255)) - Argon2 hashelve
- PFP (VARCHAR(512)) - Profilkép URL
- Admin (TINYINT) - Admin jogosultság
```

#### `raktar` - Raktárhelyek
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- foglalt (TINYINT) - 0 = szabad, 1 = foglalt
- hatarido (DATE) - Foglalás határideje
- Iranyitoszam (INT) - Irányítószám
- Hazszam (INT) - Házszám
- Utca (VARCHAR(64)) - Utca név
```

#### `arveres` - Árverések
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- idopont (DATETIME) - Árverés kezdete
- JelentkezID (INT, FOREIGN KEY) - Raktár ID
```

#### `arinfo` - Árverés részletei
```sql
- ID (INT, PRIMARY KEY, AUTO_INCREMENT)
- AID (INT, FOREIGN KEY) - Árverés ID
- Licit (INT) - Aktuális licit érték
- kepUrl (VARCHAR(1024)) - Kép URL
```

#### `fr-koto` - Felhasználó-Raktár-Árverés kapcsolat
```sql
- fid (INT, FOREIGN KEY) - Felhasználó ID
- rid (INT, FOREIGN KEY) - Raktár ID
- aid (INT, FOREIGN KEY) - Árverés ID
- PRIMARY KEY (fid, rid, aid)
```


## 5. Backend API Dokumentáció

**Base URL**: `http://localhost:3000`

### 5.1 Autentifikáció

#### POST `/login`
Felhasználó bejelentkezése.

**Request**:
```json
{
  "Email": "user@example.com",
  "Jelszo": "password"
}
```

**Response**:
- Sikeres: `200 OK` → "Sikeres bejelentkezés"
- Hiba: `401 Unauthorized` → "Invalid email or password"
- DB hiba: `500` → "Adatbázis hiba"

**Kommentek**: 
- Jelszó ellenőrzés Argon2-vel
- Session kezelés nincs implementálva (TODO)

---

#### POST `/register`
Új felhasználó regisztrációja.

**Request**:
```json
{
  "Felhasznalonev": "username",
  "Email": "user@example.com",
  "Jelszo": "password"
}
```

**Response**:
- Sikeres: `201 Created` → "Sikeres regisztráció"
- DB hiba: `500` → "Adatbázis hiba"

**Kommentek**:
- Jelszó automatikusan Argon2-vel hashelt
- Email és felhasználónév unicitást MySQL kényszer garantálja

---

### 5.2 Profil Kezelés

#### GET `/p/info`
Összes regisztrált felhasználó adatai.

**Request**: Nincs body

**Response**:
```json
[
  {
    "FelhasznaloNev": "user1",
    "Email": "user1@example.com"
  },
  {
    "FelhasznaloNev": "user2",
    "Email": "user2@example.com"
  }
]
```

#### POST `/p/mod`
Felhasználónév módosítása.

**Request**:
```json
{
  "Felhasznalonev": "new_username",
  "RegiFnev": "old_username"
}
```

**Response**:
- Sikeres: `200 OK` → "Sikeres módosítás"
- Hiba: `500` → "Adatbázis hiba"

**Kommentek**: 
- Status: Tesztelni szükséges
- TODO: Autentifikáció megköveteltessé tenni

---

#### PATCH `/p/jelszo`
Jelszó módosítása.

**Request**:
```json
{
  "UjJelszo": "new_password",
  "Felhasznalonev": "username"
}
```

**Response**:
- Sikeres: `200 OK` → "Sikeres jelszó módosítás"
- Hiba: `500` → "Adatbázis hiba"

**Kommentek**:
- Status: Tesztelni szükséges
- Jelszó érkezik plain text-ben → HTTPS kötelező prod-ban

---

#### DELETE `/p/torles`
Felhasználói profil törlése.

**Request**:
```json
{
  "Felhasznalonev": "username"
}
```

**Response**:
- Sikeres: `200 OK` → "Sikeres profil törlés"
- Hiba: `500` → "Adatbázis hiba"

**Kommentek**:
- Status: Tesztelni szükséges
- Kötegelt törlés (fr-koto táblát is érinti CASCADE miatt)

---

### 5.3 Raktár Kezelés

#### GET `/raktar`
Összes raktár információ lekérdezése.

**Request**: Nincs body

**Response**:
```json
[
  {
    "raktár száma": 1,
    "foglaltság": 0,
    "határidő": "2026-06-30",
    "Iranyitoszam": 1011,
    "Hazszam": 25,
    "Utca": "Pesti út"
  }
]
```

**Kommentek**:
- Lekérdezés alias-okat használ (magyar oszlopnevek)

---

### 5.4 Árverés Kezelés

#### GET `/arveres`
Összes árverés és kapcsolódó raktár info.

**Request**: Nincs body

**Response**:
```json
[
  {
    "id": 1,
    "Iranyitoszam": 1011,
    "Hazszam": 25,
    "Utca": "Pesti út",
    "idopont": "2026-04-12T10:00:00.000Z"
  }
]
```

**Kommentek**:
- INNER JOIN: csak meglévő árveréseket adja vissza
- Frontend ezt használja az Árverések oldalon

---

#### GET `/arveresinfo/:id`
Egy adott árverés részletei és licit információ.

**Request**: URL paraméter `id`

**Response**:
```json
[
  {
    "ID": 1,
    "AID": 1,
    "Licit": 5000,
    "kepUrl": "https://example.com/image.jpg",
    "id": 1,
    "idopont": "2026-04-12T10:00:00.000Z",
    "JelentkezID": 1
  }
]
```

**Kommentek**:
- Megértés: `AID` az árverés ID-ja, nem az `ID`

---

#### PATCH `/arveresinfo/update`
Licit frissítése minimum követelménnyel.

**Request**:
```json
{
  "aid": 1,
  "licit": 5100
}
```

**Response**:
- Sikeres: `200 OK` → "Sikeres licit!"
- Túl alacsony: `400 Bad Request` → "A licit túl alacsony. Minimum: 5100"
- Hiba: `500` → "Adatbázis hiba a frissítéskor."

**Logika**:
- Min. licit = jelenlegi + min(10% jelenlegi, 50)
- Például: 5000 → minimum 5100 (10% = 500, de max 50)

**Kommentek**:
- Frontier: Kerül két lekérdezés (GET + UPDATE)

---

## 6. Frontend Komponensek

### 6.1 Az App.jsx nyújt
- Bootstrap CSS integráció
- React Router-al setup
- Közös Navbar + Footer
- 7 route-ot definiál

### 6.2 Oldalak

#### Home.jsx - Főoldal
- Hero section banner kép-vel
- Rövid bemutató

#### Login.jsx - Bejelentkezés
- Email + jelszó form
- Error/Success üzenetek
- Loading spinner
- POST /login hívás

**Validáció**: Client-side alapvető email/password check

**Kommentek**:
- Session tárolás: localStorage vagy sessionStorage szükséges (jelenleg nincs)

---

#### Registration.jsx - Regisztráció
- Felhasználónév + Email + Jelszó form
- Jelszó megerősítés
- POST /register hívás

**Validáció**:
- Jelszavak egyezésének ellenőrzése
- Client-side nem elég → backend validáció szükséges

---

#### Profil.jsx - Felhasználói Profil
- Profil módosítás
- Jelszó módosítás
- Profil törlés

**Kommentek**:
- TODO: Csak bejelentkeztettre elérhető (autentifikáció szükséges)

---

#### Raktar.jsx - Raktárak Oldala
- GET /raktar hívás
- Raktárak megjelenítése kártya formában
- Badge: foglalt/szabad státusz

**Adatok**:
```
Raktár #1
- Foglaltság: Szabad / Foglalt
- Határidő: 2026-06-30
- Cím: 1011 Budapest, Pesti út 25
```

---

#### Arveresek.jsx - Árverések Oldala
- GET /arveres hívás
- Árverések megjelenítése kártya formában
- Bejelentkezés arveresinfo/:id URL-re

**Kommentek**:
- Kártya képe: placeholder (holdmyhanddaddy.avif)

---

#### PlaceBid.jsx - Árverés Részletei
- GET /arveresinfo/:id hívás
- Aktuális licit megjelenítés
- Új licit form
- PATCH /arveresinfo/update hívás
- Licit validáció (min. érték)

**Funkciók**:
- Licit beadása
- Visszaszámlálás (hardcoded: 2h 45m 10s)
- Licit történet (TODO)

---

## 7. Telepítési Útmutató

### 7.1 Backend Setup

1. **Függőségek telepítése**:
```bash
cd Backend
npm install
```

2. **Adatbázis létrehozása**:
```bash
mysql -u root < ../warehouse.sql
mysql -u root warehouse < ../filling.sql  # opcionális: teszt adatok
```

3. **Környezeti változók** (opcionális `.env` fájl):
```
DB_Host=localhost
DB_User=root
DB_Password=
DB_Name=warehouse
DB_Port=3307
```

4. **Szerver indítása**:
```bash
npm start          # production
# vagy
npm run dev        # development (nodemon-nal)
```

Szerver fut: `http://localhost:3000`

---

### 7.2 Frontend Setup

1. **Függőségek telepítése**:
```bash
cd frontend
npm install
```

2. **Szerver indítása**:
```bash
npm run dev        # Development (Vite)
```

Frontend fut: `http://localhost:5173` (Vite default)

---

### 7.3 Teljes indítás

```bash
# Terminal 1: Backend
cd Backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Adatbázis: MySQL szerver fut-e? (3307-en hallgasson)
```

---

## 8. Biztonsági Megfontolások

### ✅ Meglévő biztonság
- **Jelszavak**: Argon2 hashelés
- **CORS**: Engedélyezve (https://localhost:3000-ből)
- **DB kapcsolat**: Environment variables lehetséges

### Javasolt frissítések

1. **Session/JWT kezelés**:
```javascript
const jwt = require('jsonwebtoken');
// Minden protected route-hoz: verify token
```

2. **Input validáció**:
```javascript
const { body, validationResult } = require('express-validator');
```

3. **Rate limiting**:
```javascript
const rateLimit = require('express-rate-limit');
```

---

## 9. Fejlesztési Útmutató

### 9.1 Új API végpont hozzáadása

Szerver oldali template (server.js):
```javascript
app.get('/api/new-endpoint', (req, res) => {
    // 1. Validáció
    // 2. DB lekérdezés
    // 3. Válasz
    const sql = 'SELECT * FROM table_name WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.json(results);
    });
});
```

Frontend oldali template (React):
```jsx
useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/new-endpoint");
            if (!res.ok) throw new Error("Hiba");
            const data = await res.json();
            setState(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);
```

### 9.2 Linting és Kód Minőség

Frontend:
```bash
npm run lint        # ESLint futtatása
npm run build       # Production build
```

### 9.3 Debug üzenetek

Backend (node):
```javascript
console.log("DEBUG:", variableName);
// vagy
console.error("ERROR:", err);
```

Frontend (React DevTools):
```javascript
console.log("State:", state);
// React DevTools böngésző plugin ajánlott
```

---

## 10. Ismert Problémák & TODO

### 🐛 Ismert Bugok

1. **Profil módosítás nem tesztelt**
   - Issue: PATCH `/p/jelszo`, POST `/p/mod` még nincs ellenőrizve
   - Tesztelés szükséges

2. **Session kezelés hiánya**
   - Issue: Bejelentkezés után felhasználó státusza nem marad meg
   - Megoldás: localStorage vagyServer-side session

3. **Raktár-Árverés JOIN hiba**
   - Issue: `JOIN ... ON raktar.id = arveres.id` valszínűleg hibás
   - Fix szükséges: `ON raktar.id = arveres.JelentkezID` valószínű

4. **Placeholder képek**
   - Issue: PlaceBid.jsx-ben `/api/placeholder/600/600`
   - Fix: `arinfo.kepUrl` helyett

### 📋 TODO lista

---

## 11. Kötelező Olvasandó Fájlok

Projekt információ:

- [api_terv.txt](../api_terv.txt) - API tervek
- [CsapatElosztas.txt](../CsapatElosztas.txt) - Csapat szerepek
- [warehouse.sql](../warehouse.sql) - DB séma & inicializálás
- [filling.sql](../filling.sql) - Teszt adatok
- [frontend/README.md](../frontend/README.md) - Frontend specifikus infó

---

## 12. Hasznos Parancsok & Linkek

### Parancsok

```bash
# Backend
npm start                  # Production run
npm run dev               # Development (nodemon)
npm install               # Függőségek telepítése

# Frontend
npm run dev               # Vite dev szerver
npm run build            # Production build
npm run lint             # ESLint
npm run preview          # Build előnézete

# Database
mysql -u root               # MySQL shell
mysql -u root warehouse < warehouse.sql  # Import séma
```

### Linkek

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MySQL**: localhost:3307

### Böngésző DevTools

- React DevTools extension
- Redux DevTools (ha Redux-ot használunk később)
- Network tab az API hívások debug-golásához

---

## 13. Verziózás & Frissítési Napló

| Verzió | Dátum | Megjegyzések |
|--------|-------|-------------|
| 1.0 | 2026-04-12 | Teljes fejlesztői dokumentáció |
| 0.1 | ? | API végpontok leírása |

---

**Utolsó frissítés**: 2026.04.12
**Szerzők**: Fejlesztő Csapat
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