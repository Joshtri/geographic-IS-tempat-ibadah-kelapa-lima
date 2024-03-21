const db = require('../utils/database');

exports.locationPage = (req,res)=>{
    const locals = {
        title: "Data Lokasi"
    }
    //memanggil function untuk mengambil data lokasi
    fetchDataLocation((err,locations)=>{
        if(err){
            // Jika terjadi kesalahan saat mengambil data dari database, tangani di sini
            console.error("Error fetching data:", err);
            // Kemudian kirimkan respon yang sesuai, misalnya render halaman dengan pesan error
            res.render('data_location', { error: "Failed to fetch data. Please try again later." });
            return;
        }

        res.render('data_location', {
            locations : locations,
            locals
        });
    });
}


// exports controller untuk menambahkan data lokasi baru ke database
exports.postLocation = (req, res) => {
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

      else{
        res.redirect('/data/data_location')
      }
    //   console.log('Data lokasi baru telah ditambahkan:', result);
    //   res.status(201).json({ message: 'Data lokasi baru telah ditambahkan.' });
    });
};


// Fungsi untuk mengambil data lokasi dari database
function fetchDataLocation(callback){
    const queryRead = "SELECT * FROM locations";

    db.query(queryRead, (err,results)=>{
        if(err){
            // Jika terjadi kesalahan saat menjalankan query, panggil callback dengan kesalahan
            // throw err;
            callback(err);
            return;
        }
        // Jika berhasil, kirimkan hasil query melalui callback tanpa kesalahan

        callback(null,results)        
    });
}

exports.addLocationPage = (req, res) => {
    const locals = {
        title: "Tambah Lokasi"
    }
    res.render('add_location',{
        locals
    });
};


// Menghapus data Lokasi berdasarkan ID
exports.deleteLocation = (req, res) => {
    const locationId = req.params.id;

    const query = 'DELETE FROM locations WHERE id = ?';

    db.query(query, [locationId], (error, results) => {
        if (error) {
            console.error('Error deleting location:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        else{
            // res.s    end('sukses hapus')
            res.redirect('/data/data_location')
        }



        // res.status(204).end(); // No Content
    });
};
