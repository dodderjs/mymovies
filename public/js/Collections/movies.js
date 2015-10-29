/* SINGLETON */
define([
	'underscore',
	'backbone',
	'Models/movie',
	'config'
], function (_, Backbone, Movie, config) {
	
	var Movies = Backbone.Collection.extend({
		model: Movie,

		url: config.baseurl + '/movies',

		//comparator: 'lastupload'
		comparator: function(movie) {
  			return -movie.get('lastupload');
		},

		page: 1,

		fetch: function(options) {
			this.page = options.reset ? 1 : this.page + 1; 
			
			if (this.page > 1) {
				_.extend(options, { data: { page: this.page }})
			}
			
			Backbone.Collection.prototype.fetch.apply(this, [options]);
		}
	});

	return new Movies();
});