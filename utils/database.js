// const { model } = require('mongoose');
const mysql = require('mysql');


//config database

const db = mysql.createConnection({
    host :  process.env.DB_HOST,
    user :  process.env.DB_USERNAME,
    database :  process.env.DB_NAME,
    password:  process.env.DB_PASSWORD,

})


// Tautan ke database
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Terhubung ke database MySQL');
});


module.exports = db;
