/* SINGLETON */
define([
	'underscore',
	'backbone',
	'Models/torrent',
	'config'
], function (_, Backbone, Torrent, config) {
	
	var Torrents = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Torrent,

		url: function () {
			return config.baseurl + '/torrents/movie/' + this.id
		},

		id:  null,

		data: {
			downloads: 11,
			from: '',
			id: 0,
			leach: 0,
			movieid: '',
			quality: 0,
			seed: 0,
			size: 0,
			threeD: 0,
			type: '',
			uploaded: 0
		},

		fetch: function(options) {
			this.id = options.id
			Backbone.Collection.prototype.fetch.apply(this, [options]);
		}

	});

	return new Torrents();
});