const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name,
    port: process.env.DB_Port
});
//Főoldal
app.get('/', (req, res) => {
    res.send('Főoldal');
});

//WIP
app.post('/login', (req, res) => {
    res.send('Bejelentkezés oldal');
});

//WIP
app.post('/register', (req, res) => {
    res.send('Regisztráció oldal');
});

// A raktárak információit kérdezi le
app.get('/raktar', (req, res) => {
    const sql = 'SELECT id as "raktár száma", foglalt as "foglaltság", hatarido as "határidő" FROM raktar';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
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
            return res.status(500).send(err);
        }
        res.json(results);
    }
    );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});