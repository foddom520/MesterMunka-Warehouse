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
    port: process.env.DB_Port || 3307
});
//Főoldal
app.get('/', (req, res) => {
    res.send('Főoldal');
});

//Bejelentkezés
app.post('/login', async (req, res) => {
    const { Email, Jelszo } = req.body;
    const sql = 'SELECT * FROM felhasznalok WHERE Email = ?';
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
    const { Vnev, Knev, Felhasznalonev, Email, Jelszo } = req.body;
    const hashedPassword = await argon2.hash(password);
    const sql = 'INSERT INTO felhasznalok (Vnev, Knev, FelhasznaloNev, Email, Jelszo) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.status(201).send('Sikeres regisztráció');
    });
});

// A raktárak információit kérdezi le
app.get('/raktar', (req, res) => {
    const sql = 'SELECT id as "raktár száma", foglalt as "foglaltság", hatarido as "határidő" FROM raktar';
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
    const sql = 'select raktar.id, arveres.idopont, arveres.id FROM raktar INNER JOIN arveres ON raktar.aid = arveres.id;';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Adatbázis hiba");
        }
        res.json(results);
    }
    );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});