/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Views/movie'
], function ($, _, Backbone, MovieView) {
	return Backbone.View.extend({
		
		collection: null,

		el:  '#MovieList',
 	
	 	initialize: function(options) {
			this.collection = options.collection;

			_.bindAll(this, 'reset');
			_.bindAll(this, 'render');

			this.collection.bind('reset', this.reset);
			this.collection.bind('update', this.reset);
	    },

	    reset: function () {
	    	this.$el.empty();
	    	this.render();
	    },

	    // Re-render the contents of the todo item.
	    render: function() {
	    	var element = this.$el;

			this.collection.forEach(function(item) {
				var movieView = new MovieView({
					model: item
				});

				element.append(movieView.render().el);
			}, this);
	    	return this;
	    }
	});
});