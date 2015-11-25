var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Just a moviesite' });
});

router.get('/movie/:id', function(req, res, next) {
  res.render('index', { title: 'Just a moviesite', id: req.params.id });
});

router.get('/upcoming', function(req, res, next) {
  res.render('index', { title: 'Just a moviesite'});
});

router.get('/upcoming/movie/:id', function(req, res, next) {
  res.render('index', { title: 'Just a moviesite', id: req.params.id });
});

router.get('/movie/:id/image(/:width)?', function(req, res, next) {
	var url = config.url + '/movies/image/' + req.params.id + (req.params.width ? '?w=' + req.params.width : '');

  	req.pipe(
  		request({
  			url: url,
  			headers: {'x-access-apikey': config.key}
  		})).pipe(res);
});

module.exports = router;