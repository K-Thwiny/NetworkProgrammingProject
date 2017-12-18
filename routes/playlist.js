var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res, next) {
	let db = new sqlite3.Database('./chinook.db');
	let sql = "SELECT playlistId as ID, Name as Playlist_Name FROM playlists";
	db.all(sql, [], (err, rows) =>{
		if (err)throw err;
		db.close();
		res.render('playlist', {title: 'Playlist', playlist_rows: rows});
	});
});

router.post('/', function(req, res, next) {
	let db = new sqlite3.Database('./chinook.db');
	let sql1 = "SELECT playlistId as ID, Name as Playlist_Name FROM playlists";
	let sql2 = `SELECT tracks.Name as name
				FROM tracks, playlists, playlist_track
				WHERE playlists.PlaylistId = ?
				AND playlists.PlaylistId = playlist_track.PlaylistId 
				AND playlist_track.TrackId = tracks.TrackId`;
	db.all(sql1, [], (err, rows1) => {
		if(err) console.error(err.message);
		db.all(sql2, [req.body.userid], (err, rows2) => {
			if(err)throw err;
			db.close();
			console.log(rows1);
			console.log(rows2);
			res.render('playlist', {title: 'Playlist', playlist_rows: rows1, track_list: rows2});
		});
	});
});

module.exports = router;