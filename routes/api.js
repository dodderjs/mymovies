var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/api');

/* GET home page. */
router.use(function(req, res, next) {
	var url = config.url + req.path,
		headers = { 'x-access-apikey': config.key };

		if (req.user && req.user.token) {
			headers['x-user-token'] = req.user.token;
		}

	request({
		url: url,
		headers: headers,
		qs: req.query,
		user: req.user
	}).pipe(res);
});


module.exports = router;