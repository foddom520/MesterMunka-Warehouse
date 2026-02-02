const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const argon2 = require('argon2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_Host || 'localhost',
    user: process.env.DB_User || 'root',
    password: process.env.DB_Password || '',
    database: process.env.DB_Name || 'warehouse',
    port: process.env.DB_Port || 3307 || 3306
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
    const { /*Jelszo,*/ UjJelszo, Felhasznalonev } = req.body; //az eredeti jelszót nem használjuk jelenleg 

   /* const sql = 'SELECT Jelszo FROM felhasznalo WHERE FelhasznaloNev = ?';

    db.query(sql, [Felhasznalonev], async (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid user'); //ha ez megjelenik, akkor nagy baj van
        }
        
        const user = results[0];
        const validPassword = await argon2.verify(user.Jelszo, Jelszo);
        if (!validPassword) {
            return res.status(401).send('Invalid current password'); //Megerősítjük hogy a profil tulajdonosa akar jelszót változtatni
        }
        */

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
    const sql = 'SELECT id as "raktár száma", foglalt as "foglaltság", hatarido as "határidő", Iranyitoszam, Hazszam, Utca, FROM raktar';
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
            return res.status(500).send("Adatbázis hiba");
        }
        res.json(results);
    }
    );
});

//Jelentkezés árverésre



//





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});