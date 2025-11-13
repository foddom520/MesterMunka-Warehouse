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

app.get('/', (req, res) => {
    res.send('Főoldal');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});