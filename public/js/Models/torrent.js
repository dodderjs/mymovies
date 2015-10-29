define([
	'underscore',
	'backbone'
], function (_, Backbone) {

	return Backbone.Model.extend({
		defaults: {
			id: null,
			title: '',
			altTitle: '',
			type: '',
			uploaded: '',
			size: '',
			downloads: '',
			seed: '',
			leech: '',
			movieid: null,
			movierank: 0
		}

	});
});