const express = require('express');
const { locationPage, addLocationPage, deleteLocation, postLocation} = require('../controllers/locationController');
const router = express.Router();


router.get('/data_location', locationPage );
router.get('/add_location', addLocationPage );

router.post('/post_location', postLocation );
// DELETE route untuk menghapus data Lokasi
router.delete('/delete_location/:id', deleteLocation);


module.exports= router;