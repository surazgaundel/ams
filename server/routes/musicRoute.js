const express = require("express");
const router = express.Router();
const Music = require("../models/music");
const Artist = require("../models/artist");

// Get all music records with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const musicRecords = await Music.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Music.countDocuments();
    res.json({
      musics:musicRecords,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all songs for a specific artist
router.get("/artist/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const songs = await Music.find({ artistId })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalSongs = await Music.countDocuments({ artistId });
    res.json({
      songs,
      totalSongs,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new song
router.post("/artist/:artistId", async (req, res) => {
  const { artistId } = req.params;
  try {
    // Check if the artist exists
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // Add artistId to the song and save
    const newSong = new Music({ ...req.body, artistId });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a song
router.put("/:id", async (req, res) => {
  try {
    const updatedSong = await Music.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(updatedSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a song
router.delete("/:id", async (req, res) => {
  try {
    const deletedSong = await Music.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json({ message: "Song deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
