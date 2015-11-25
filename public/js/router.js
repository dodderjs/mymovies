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
			'movie/:mid': 'movie',
			'upcoming': 'upcoming',
			'upcoming/movie/:mid': 'upcoming_movie'
		},
		movies: null,
		list: null,

		initialize: function () {
			this.movies = MovieCollection;
			this.details = MovieDetails;
			this.list = new MovieList({ collection: this.movies });
		},

		index: function() {			
			this.details.close();
			this.list.show();

			
			this.movies.on('select', $.proxy(function (model) {
				this.list.hide();
				this.details.render(model);
				this.navigate('movie/' + model.get('id'));
			},this));

			if (!this.movies.models.length) {
				this.movies.url = '/api/movies/onseed/'
				this.movies.fetch({
					reset: true
				});
				this.details.on('close', $.proxy(function () {
					this.navigate('');
					this.list.show();
				}, this));
			}

			if (!$.cookie('lastVisit')) {
				$.cookie('lastVisit', Date.now(), { expires: 0.5 }); 
			}
		},

		movie: function (id) {
			var model = this.movies.get(id) || new Movie({ id: id });
			model.fetch({ 
				context: this,
				success: function (m) {
					this.details.render(m);
				}
			});

			this.details.once('close', $.proxy(function () {
				this.navigate('', {trigger:true});
				model.destroy();
			}, this));
		},

		upcoming: function () {
			this.details.close();
			this.list.show();

			
			this.movies.on('select', $.proxy(function (model) {
				this.list.hide();
				this.details.render(model);
				this.navigate('upcoming/movie/' + model.get('id'));
			},this));

			if (!this.movies.models.length) {
				this.movies.url = '/api/movies/'
				this.movies.fetch({
					reset: true
				});
				this.details.on('close', $.proxy(function () {
					this.navigate('upcoming');
					this.list.show();
				}, this));
			}

			if (!$.cookie('lastVisit')) {
				$.cookie('lastVisit', Date.now(), { expires: 0.5 }); 
			}
		},


		upcoming_movie: function (id) {
			var model = this.movies.get(id) || new Movie({ id: id });
			model.fetch({ 
				context: this,
				success: function (m) {
					this.details.render(m);
				}
			});

			this.details.once('close', $.proxy(function () {
				this.navigate('upcoming', {trigger:true});
				model.destroy();
			}, this));
		},
	});
});