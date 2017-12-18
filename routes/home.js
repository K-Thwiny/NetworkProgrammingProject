var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('home', { title: 'Hello' });
	});

module.exports = router;