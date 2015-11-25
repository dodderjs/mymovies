var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/api');

/* GET home page. */
router.get('/*', function(req, res, next) {
	var url = config.url + req.path;

  	req.pipe(
  		request({
  			url: url,
  			headers: {'x-access-apikey': config.key},
  			qs: req.query
  		})).pipe(res);
});

module.exports = router;