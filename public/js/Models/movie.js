define([
	'underscore',
	'backbone',
	'Collections/torrents'
], function (_, Backbone, Torrents) {

	return Backbone.Model.extend({
		defaults: {
			id: '',
			title: '',
			hu_title: '',
			poster: null,
			imdb_rank: 0,
			lastupload: 0,
			metascore: 0,
			pg: '',
			plot: '',
			release_date: 0,
			runtime: 0,
			year: 0,
			fresh: false
		},

		urlRoot: '/api/movies',

		set: function (key, val, options) {
			var lastVisit = $.cookie('lastVisit');

			if (typeof key === 'object') {
				key.poster = key.poster ? { 'small': '/api/movies/' + key.id + '/image/200', 'original': '/api/movies/' + key.id + '/image' } : null;
				key.fresh = lastVisit < key.lastupload * 1000;				
			} else {
				switch (key) {
					case 'lastupload': 
						fresh = lastVisit < val * 1000;
						break;
					case 'poster':
						val = val ? { 'small': '/api/movies/' + this.id + '/image/200', 'original': '/api/movies/' + this.id + '/image' } : null;
						console.log('kljlkj', key, val, this.id)
						break;
				}
				
			}

			return Backbone.Model.prototype.set.apply(this, arguments);
		}

	});
});