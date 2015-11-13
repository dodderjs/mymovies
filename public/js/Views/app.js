define([
	'jquery',
	'underscore',
	'backbone',
	'Collections/movies'
], function ($, _, Backbone, Movies) {

	return Backbone.View.extend({

		el: '#App',

		initialize: function () {
			this.movies = Movies;

			this.movies.on('request', $.proxy(function() {
				this.$el.addClass('loading');
			}, this));
			this.movies.on('sync', $.proxy(function() {
				this.$el.removeClass('loading');
			}, this));
		}
	});
});