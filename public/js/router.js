define([
	'jquery',
	'backbone',
	'Collections/movies',
	'Views/movieList'
], function ($, Backbone, MovieCollection, MovieList) {
	return Backbone.Router.extend({
		routes: {
			'': 'index'
		},
		movies: null,
		list: null,

		index: function () {
			this.movies = MovieCollection;
			this.list = new MovieList({ collection: this.movies });

			this.movies.fetch({
				reset: true
			});

			if (!$.cookie('lastVisit')) {
				$.cookie('lastVisit', Date.now(), { expires: 0.5 }); 
			}

		}
	});
});