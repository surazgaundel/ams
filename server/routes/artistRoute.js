const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const Music = require('../models/music');
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
router.post('/import',upload.single('file'), async (req, res) => {
  const filePath = req.file?.path;
    if (!filePath) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const csvData = [];
    let isEmpty = true;
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (data) => {
        isEmpty =false;
        const {name,dob,gender,address,firstReleaseYear,noOfAlbumReleased,createdAt,updatedAt} = data;
        csvData.push({
          name,
          dob,
          gender,
          address,
          firstReleaseYear,
          noOfAlbumReleased,
          createdAt,
          updatedAt,
        })
      })
      .on('end', async () => {
        fs.unlinkSync(filePath);
        if(isEmpty){
          return res.status(400).json({ message: 'CSV file is empty.' });
        }
        try{
          await Artist.insertMany(csvData);
          res.status(201).json({ message: 'Artists imported successfully.' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      })
      .on('error', (error) => {
        fs.unlinkSync(filePath);
        console.error('Error reading CSV file:', error);
        res.status(500).json({ error: 'Failed to process CSV file' });
      });
});

// Export CSV
router.get('/export', async (req, res) => {
  try {
    const artists = await Artist.find().lean().exec(); //bypass mongoose document to plain object speed up the process
    const csvStream = csv.format({ headers: true });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="artists.csv"');
    csvStream.pipe(res);
    artists.forEach((artist) => csvStream.write(artist));
    csvStream.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Songs for an artist
router.get('/:artistId', async (req, res) => {
  console.log('??',req.params.artistId);
  try {
    const songs = await Music.find({ artistId: req.params.artistId });
    console.log('??',songs);
    if(songs.length > 0){
      res.json({songs,message:'Songs fetched successfully'});
    }else{
      res.status(404).json({message:'No songs found for this artist'});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;