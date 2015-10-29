define([
	'underscore',
	'backbone',
	'Collections/torrents',
	'config'
], function (_, Backbone, Torrents, config) {

	return Backbone.Model.extend({
		defaults: {
			hu_title: '',
			id: '',
			imageurl: null,
			imdb_rank: 0,
			lastupload: 0,
			metascore: 0,
			pg: '',
			plot: '',
			release_date: 0,
			runtime: 0,
			title: '',
			year: 0,
			fresh: false
		},

		set: function (key, val, options) {
			var lastVisit = $.cookie('lastVisit');

			if (typeof key === 'object') {
				key.imageurl = key.imageurl ? { 'small': config.baseurl + '/movies/image/' + key.id + '?w=200', 'original': config.baseurl + '/movies/image/' + key.id } : null;
				key.fresh = lastVisit < key.lastupload * 1000;
			} else {
				switch (key) {
					case 'lastupload': 
						fresh = lastVisit < val * 1000;
						break;
					case 'imageurl':
						val = val ? { 'small': config.baseurl + '/movies/image/' + key.id + '?w=200', 'original': config.baseurl + '/movies/image/' + key.id } : null;
						break;
				}
				
			}

			Backbone.Model.prototype.set.apply(this, arguments);
		}

	});
});