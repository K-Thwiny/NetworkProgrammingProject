var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function(req, res, next) {
	let db = new sqlite3.Database('./chinook.db');
	let sql = "SELECT GenreId, Name FROM genres";
	db.all(sql, [], (err, rows) =>{
		if (err)throw err;
		db.close();
		res.render('genresearch', {title: 'Genre Search', genre_rows: rows});
	});
});

router.post('/', function(req, res, next) {
	let db = new sqlite3.Database('./chinook.db');
	let sql1 = "SELECT GenreId, Name FROM genres";
	let sql2 = `SELECT tracks.Name as TrackName, media_types.Name as MediaType, genres.Name as Genres, albums.Title as AlbumTitle
				FROM tracks JOIN media_types JOIN genres JOIN albums
				ON tracks.MediaTypeId = media_types.MediaTypeId
				AND albums.AlbumId = tracks.TrackId
				AND tracks.GenreId = genres.GenreId
				AND genres.GenreId = ?
				ORDER BY AlbumTitle ASC`;
	db.all(sql1, [], (err, rows1) => {
		if(err) console.error(err.message);
		db.all(sql2, [req.body.genreid], (err, rows2) => {
			if(err)throw err;
			db.close();
			res.render('genresearch', {title: 'Genre Search', genre_rows:rows1, track_genres: rows2});
		});
	});
});





module.exports = router;