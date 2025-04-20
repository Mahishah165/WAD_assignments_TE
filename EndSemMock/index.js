const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Song Schema
const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

const Song = mongoose.model('Song', songSchema, 'songdetails');

// a & b) Database 'music' and collection 'songdetails' are created automatically
// c) Insert 5 song documents
app.get('/insert-songs', async (req, res) => {
  const songs = [
    { Songname: "Deva Deva", Film: "Bhramasrta", Music_director: "", Singer: "Arjit Sign" },
    { Songname: "Song2", Film: "Film2", Music_director: "MD2", Singer: "Singer2" },
    { Songname: "Song3", Film: "Film1", Music_director: "MD1", Singer: "Singer3" },
    { Songname: "Song4", Film: "Film3", Music_director: "MD2", Singer: "Singer1" },
    { Songname: "Song5", Film: "Film2", Music_director: "MD1", Singer: "Singer2" }
  ];

  try {
    await Song.insertMany(songs);
    res.send('Songs inserted successfully');
  } catch (err) {
    res.status(500).send('Error inserting songs: ' + err.message);
  }
});

// d) Display count and list all documents
app.get('/songs', async (req, res) => {
  try {
    const count = await Song.countDocuments();
    const songs = await Song.find();
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Total Songs: ${count}</h2>
        ${generateTable(songs)}
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching songs: ' + err.message);
  }
});

// e) List songs by Music Director
app.get('/songs/music-director/:director', async (req, res) => {
  try {
    const songs = await Song.find({ Music_director: req.params.director });
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Songs by ${req.params.director}</h2>
        ${generateTable(songs)}
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching songs: ' + err.message);
  }
});

// f) List songs by Music Director and Singer
app.get('/songs/music-director/:director/singer/:singer', async (req, res) => {
  try {
    const songs = await Song.find({ 
      Music_director: req.params.director,
      Singer: req.params.singer 
    });
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Songs by ${req.params.director} sung by ${req.params.singer}</h2>
        ${generateTable(songs)}
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching songs: ' + err.message);
  }
});

// g) Delete a song
app.get('/delete-song/:songname', async (req, res) => {
  try {
    await Song.deleteOne({ Songname: req.params.songname });
    res.send(`Song ${req.params.songname} deleted successfully`);
  } catch (err) {
    res.status(500).send('Error deleting song: ' + err.message);
  }
});

// h) Add new favorite song
app.get('/add-song', async (req, res) => {
  const newSong = {
    Songname: "FavoriteSong",
    Film: "FavoriteFilm",
    Music_director: "FavoriteMD",
    Singer: "FavoriteSinger"
  };

  try {
    await Song.create(newSong);
    res.send('Favorite song added successfully');
  } catch (err) {
    res.status(500).send('Error adding song: ' + err.message);
  }
});

// i) List songs by Singer and Film
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
  try {
    const songs = await Song.find({ 
      Singer: req.params.singer,
      Film: req.params.film 
    });
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Songs by ${req.params.singer} from ${req.params.film}</h2>
        ${generateTable(songs)}
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching songs: ' + err.message);
  }
});

// j) Update document with Actor and Actress
app.get('/update-actor-actress/:songname', async (req, res) => {
  try {
    await Song.updateOne(
      { Songname: req.params.songname },
      { $set: { Actor: "ActorName", Actress: "ActressName" } }
    );
    res.send(`Song ${req.params.songname} updated with actor and actress`);
  } catch (err) {
    res.status(500).send('Error updating song: ' + err.message);
  }
});

// k) Display all data in tabular format
app.get('/songs-table', async (req, res) => {
  try {
    const songs = await Song.find();
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>All Songs</h2>
        ${generateTable(songs)}
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error fetching songs: ' + err.message);
  }
});

// Helper function to generate HTML table
function generateTable(songs) {
  let table = `
    <table>
      <tr>
        <th>Song Name</th>
        <th>Film Name</th>
        <th>Music Director</th>
        <th>Singer</th>
        <th>Actor</th>
        <th>Actress</th>
      </tr>
  `;
  
  songs.forEach(song => {
    table += `
      <tr>
        <td>${song.Songname}</td>
        <td>${song.Film}</td>
        <td>${song.Music_director}</td>
        <td>${song.Singer}</td>
        <td>${song.Actor || ''}</td>
        <td>${song.Actress || ''}</td>
      </tr>
    `;
  });

  table += '</table>';
  return table;
}

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});