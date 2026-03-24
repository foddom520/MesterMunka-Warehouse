const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const argon2 = require('argon2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost' || process.env.DB_Host,
    user: 'root' || process.env.DB_User,
    password: '' || process.env.DB_Password,
    database: 'warehouse' || process.env.DB_Name ,
    port: 3307 || process.env.DB_Port || process.env.DB_Port2
});

//Bejelentkezés
app.post('/login', async (req, res) => {
    const { Email, Jelszo } = req.body;
    const sql = 'SELECT * FROM felhasznalo WHERE Email = ?';
    db.query(sql, [Email], async (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        const user = results[0];
        const validPassword = await argon2.verify(user.Jelszo, Jelszo); 
        if (!validPassword) {
            return res.status(401).send('Invalid email or password');
        }
        res.status(200).send('Sikeres bejelentkezés');
    });
});


//Regisztráció
app.post('/register', async (req, res) => {
  const {Felhasznalonev, Email, Jelszo } = req.body;

  const hashedPassword = await argon2.hash(Jelszo);

  const sql = 'INSERT INTO felhasznalo (FelhasznaloNev, Email, Jelszo) VALUES (?, ?, ?)';
  db.query(sql, [Felhasznalonev, Email, hashedPassword], (err, results) => {
    if (err) {
      console.error("REGISTER DB ERROR:", err);
      return res.status(500).send("Adatbázis hiba");
    }
    res.status(201).send('Sikeres regisztráció');
  });
});


//Jelszó módosítás

app.patch('/p/jelszo', async (req, res) => {
    const { UjJelszo, Felhasznalonev } = req.body;
        const hashedPassword = await argon2.hash(UjJelszo);//új jelszó hashelése
        const updateSql = 'UPDATE felhasznalo SET Jelszo = ? WHERE FelhasznaloNev = ?';//felülírja a régi jelszót

        db.query(updateSql, [hashedPassword, Felhasznalonev], (err, results) => {
            if (err) {
                return res.status(500).send("Adatbázis hiba");
            }
            res.status(200).send('Sikeres jelszó módosítás');
        });
    //});
});
//tesztelni ^^^^^^^


//Profil törlés

app.delete('/p/torles', (req, res) => {
    const { Felhasznalonev } = req.body;
    const sql = 'DELETE FROM felhasznalo WHERE FelhasznaloNev = ?';
    db.query(sql, [Felhasznalonev], (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.status(200).send('Sikeres profil törlés');
    });
});
//tesztelni ^^^^^^^


//Profil oldal api
app.get('/p/info', (req, res) => {
    const sql = 'select FelhasznaloNev, Email from felhasznalo';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.json(results);
    }
    );
});


//Profilnév módosítás
app.post('/p/mod', (req, res) => {
    const { Felhasznalonev, RegiFnev } = req.body;
    const sql = 'UPDATE felhasznalo SET FelhasznaloNev = ? WHERE FelhasznaloNev = ?';
    db.query(sql, [Felhasznalonev, RegiFnev], (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.status(200).send('Sikeres módosítás');
    });
});
//tesztelni ^^^^^^^


// A raktárak információit kérdezi le
app.get('/raktar', (req, res) => {
    const sql = 'SELECT id as "raktár száma", foglalt as "foglaltság", hatarido as "határidő", Iranyitoszam, Hazszam, Utca FROM raktar';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.json(results);
    }
    );
});


// Az összes árverést kérdezi le
app.get('/arveres', (req, res) => {
    const sql = 'select raktar.id, raktar.Iranyitoszam, raktar.Hazszam, raktar.Utca, arveres.idopont, arveres.id FROM raktar INNER JOIN arveres ON raktar.id = arveres.id;';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Adatbázis hiba"+err);
        }
        res.json(results);
    }
    );
});

//

app.get('/arveresinfo/:id', (req, res) => {
    const arveresId = req.params.id;
    const sql = 'SELECT * FROM arinfo INNER JOIN arveres ON arinfo.aid = arveres.id WHERE arveres.id = ?';
    db.query(sql, [arveresId], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Adatbázis hiba"+err);
        }
        res.json(results);
    }
    );
});


app.patch('/arveresinfo/update', (req, res) => {
    const { aid, licit } = req.body;

    const getSql = 'SELECT licit FROM arinfo WHERE aid = ?';
    
    db.query(getSql, [aid], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).send("Hiba az árverés lekérdezésekor.");
        }

        const currentBid = results[0].licit;
        const tenPercent = currentBid * 0.10;
        const requiredIncrement = Math.min(tenPercent, 50);
        const minRequired = currentBid + requiredIncrement;

        if (licit < minRequired) {
            return res.status(400).send(`A licit túl alacsony. Minimum: ${minRequired}`);
        }

        const updateSql = 'UPDATE arinfo SET licit = ? WHERE aid = ?';
        db.query(updateSql, [licit, aid], (updErr, updResults) => {
            if (updErr) {
                return res.status(500).send("Adatbázis hiba a frissítéskor.");
            }
            res.status(200).send("Sikeres licit!");
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});