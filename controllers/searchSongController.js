const fs = require("fs");
const path = require("path");

// Function to get songs from JSON files
const getSongsFromJsonFiles = () => {
  const songsPath = path.join(__dirname, "../songs"); // Path to the songs folder
  const songs = [];

  fs.readdirSync(songsPath).forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(songsPath, file);
      const songData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      songs.push({
        title: file.replace(".json", ""),
        verses: songData,
      }); // Storing title and verses
    }
  });

  return songs; // Return the array of song objects
};
// TODO: Replace with database logic!!!!!!!!!!
const songs = getSongsFromJsonFiles();

const searchSongs = (query) => {
  return songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );
};

// TODO: change to work with DB object (song)
const getSongByTitle = (title) => {
  return songs.find((song) => song.title.toLowerCase() === title.toLowerCase());
};

module.exports = { searchSongs, getSongByTitle };
