// const { model } = require('mongoose');
const mysql = require('mysql');


//config database

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'db_sig',
    password: '',

})


// Tautan ke database
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Terhubung ke database MySQL');
});


module.exports = db;
