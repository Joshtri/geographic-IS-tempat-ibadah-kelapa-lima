const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;
const db = require('./utils/database');


const dashboardRoute = require('./router/dashboard');
const locationRoute = require('./router/location');

// Middleware untuk menangani request body berformat JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))
// Menentukan path folder views
app.set('views', path.join(__dirname, 'views'));

// Menggunakan EJS sebagai view engine
app.set('view engine', 'ejs');



// Rute untuk halaman utama
app.get('/', (req, res) => {
  res.render('index'); // Render file index.ejs di dalam folder views
});

// Endpoint untuk mendapatkan data lokasi dari database
app.get('/locations', (req, res) => {
  const sql = 'SELECT * FROM locations';

  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});


// Rute untuk menampilkan form tambah data lokasi
// app.get('/add_location', (req, res) => {
//   res.render('add_location');
// });

app.use('/', dashboardRoute);
app.use('/data', locationRoute);

// Endpoint untuk menambahkan data lokasi baru ke database
// app.post('/locations', (req, res) => {
//   const { name, lat, lng } = req.body;

//   if (!name || !lat || !lng) {
//     return res.status(400).json({ error: 'Nama, lat, dan lng harus disertakan.' });
//   }

//   const sql = 'INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)';
//   const values = [name, lat, lng];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log('Data lokasi baru telah ditambahkan:', result);
//     res.status(201).json({ message: 'Data lokasi baru telah ditambahkan.' });
//   });
// });

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
