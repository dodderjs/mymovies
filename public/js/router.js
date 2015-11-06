define([
	'jquery',
	'backbone',
	'Models/movie',
	'Collections/movies',
	'Views/movieList',
	'Views/movieDetails'
], function ($, Backbone, Movie, MovieCollection, MovieList, MovieDetails) {
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			'movie/:mid': 'movie'
		},
		movies: null,
		list: null,

		initialize: function () {
			this.movies = MovieCollection;
			this.details = MovieDetails;
			this.list = new MovieList({ collection: this.movies });
		},

		index: function() {
			this.movies.on('select', $.proxy(function (model) {
				this.details.render(model);
				this.navigate('movie/' + model.get('id'));
			},this));

			this.movies.fetch({
				reset: true
			});

			this.details.on('close', $.proxy(function () {
				this.navigate('');
			}, this));

			if (!$.cookie('lastVisit')) {
				$.cookie('lastVisit', Date.now(), { expires: 0.5 }); 
			}
		},

		movie: function (id) {
			var model = new Movie({ id: id });
			model.fetch({ 
				context: this,
				success: function (m) {
					this.details.render(m);
				}
			});

			this.details.on('close', $.proxy(function () {
				this.navigate('', {trigger:true});
				model.destroy();
			}, this));
		}
	});
});