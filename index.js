const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// Middleware untuk menangani request body berformat JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Menentukan path folder views
app.set('views', path.join(__dirname, 'views'));

// Menggunakan EJS sebagai view engine
app.set('view engine', 'ejs');

// Konfigurasi koneksi database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan nama pengguna database Anda
  password: '', // Ganti dengan kata sandi database Anda
  database: 'db_sig' // Ganti dengan nama database Anda
});

// Tautan ke database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

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
app.get('/add_location', (req, res) => {
  res.render('add_location');
});

// Endpoint untuk menambahkan data lokasi baru ke database
app.post('/locations', (req, res) => {
  const { name, lat, lng } = req.body;

  if (!name || !lat || !lng) {
    return res.status(400).json({ error: 'Nama, lat, dan lng harus disertakan.' });
  }

  const sql = 'INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)';
  const values = [name, lat, lng];

  db.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Data lokasi baru telah ditambahkan:', result);
    res.status(201).json({ message: 'Data lokasi baru telah ditambahkan.' });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
