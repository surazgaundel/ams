const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const Music = require('../models/music');
const csv = require('fast-csv');

//get artist
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
      const artists = await Artist.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
      const totalArtist = await Artist.countDocuments();
      res.status(201).json({ 
        artists, 
        totalArtist, 
        page, 
        totalPages: Math.ceil(totalArtist / limit) 
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


//create artist
router.post('/', async (req, res) => {
  try {
      const newArtist = new Artist(req.body);
      await newArtist.save();
      res.status(201).json({message:'New Artist Added Successfully'});
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// update artist
router.put('/:id', async (req, res) => {
  try {
      await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({message:'Artist Updated Successfully'});
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

//delete artist
router.delete('/:id', async (req, res) => {
  try {
      await Artist.findByIdAndDelete(req.params.id);
      res.json({ message: 'Artist deleted successfully.' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Import CSV
router.post('/import', async (req, res) => {
    try {
    const csvData = []; // Parse CSV data
    // Assume req.file contains the uploaded CSV file
    csv.parseString(req.file.buffer.toString(), { headers: true })
        .on('data', (row) => csvData.push(row))
        .on('end', async () => {
        await Artist.insertMany(csvData);
        res.json({ message: 'Artists imported successfully.' });
        });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// Export CSV
router.get('/export', async (req, res) => {
  try {
    const artists = await Artist.find().lean().exec();
    const csvStream = csv.format({ headers: true });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="artists.csv"');
    csvStream.pipe(res);
    artists.forEach((artist) => csvStream.write(artist.toObject()));
    csvStream.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Songs for an artist
router.get('/musics/:artistName', async (req, res) => {
  try {
    const songs = await Music.find({ artistName: req.params.artistName });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;