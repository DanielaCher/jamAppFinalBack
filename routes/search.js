const express = require("express");
const router = express.Router();
const {
  searchSongs,
  getSongByTitle,
} = require("../controllers/searchSongController"); // Adjust the path if needed

// Define the search route
router.get("/", (req, res) => {
  const { query } = req.query; // Get query from the URL
  console.log("Received query:", query);
  const results = searchSongs(query); // Call the search function from the controller
  res.json(results); // Return the results as JSON
});

// Define route to get a song by title // TODO: change to work with DB object (song)
router.get("/song", (req, res) => {
  const { title } = req.query; // Get the title from the query
  const song = getSongByTitle(title); // Fetch the song by title
  if (song) {
    res.json(song); // Return the song data
  } else {
    res.status(404).json({ message: "Song not found" }); // Handle song not found
  }
});

module.exports = router;
