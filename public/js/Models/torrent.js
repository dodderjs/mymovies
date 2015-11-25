define([
	'underscore',
	'backbone'
], function (_, Backbone) {

	return Backbone.Model.extend({
		defaults: {
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
			uploaded: 0,
			compression: null,
			title: ''
		}

	});
});