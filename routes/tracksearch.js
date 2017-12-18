var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('tracksearch', {title: 'TrackSearch'});
});
router.post('/', function(req, res, next){
	let db = new sqlite3.Database('./chinook.db');
	let sql = "SELECT * FROM tracks WHERE Name LIKE '%" + req.body.search + "%'";
	db.all(sql, [], (err, rows) => {
		if(err)throw err;
		db.close();
		console.log(rows);
		res.render('tracksearch', {title: 'Track Search', tracks: rows, search_string: req.body.search});
	});
});

module.exports = router;