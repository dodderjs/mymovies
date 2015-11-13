/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Views/movie'
], function ($, _, Backbone, MovieView) {
	return Backbone.View.extend({
		
		collection: null,

		el:  '#MovieListView',

		events: {
			'click .more': 'loadMore' 
		},
 	
	 	initialize: function(options) {
			this.collection = options.collection;
			this.list = this.$el.find('ul');
			this.more = this.$el.find('.more');

			_.bindAll(this, 'reset');
			_.bindAll(this, 'render');

			this.collection.bind('reset', this.reset);
			this.collection.bind('update', this.reset);

			this.scrollInit();
	    },

	    reset: function () {
	    	this.list.empty();
	    	this.render();
	    },

	    // Re-render the contents of the todo item.
	    render: function() {
	    	var element = this.list;

			this.collection.forEach(function(item) {
				var movieView = new MovieView({
					model: item
				});

				element.append(movieView.render().el);
			}, this);
	    	return this;
	    },
	    hide: function () {
	    	this.$el.hide();
	    },
	    show: function () {
	    	this.$el.show();
	    },

		loadMore: function () {
			this.collection.fetch({ 
				context: this, 
				add: true, 
				merge: true, 
				remove: false, 
				success: function (collection, response) {
					if (response.length < 50) {
						$(window).off('scroll');
						this.more.addClass('din');
					}
				}
			});
		},

		lastscrolled: 0,

		scrollInit: function () {
			this.lastscrolled = +new Date();
			this.scrolling();
			$(window).on('scroll', $.proxy(this.scrolling, this));
		},

		scrolling: function () {
			if (this.lastscrolled + 1000 > +new Date()) return;

			var win = $(window);
			if (win.scrollTop() + 300 > $(document).height() - win.height()) {
				this.loadMore();
				this.lastscrolled = +new Date();
			}

			if (this.collection.page > 2) {
				$(window).off('scroll');
				this.more.removeClass('din');
			}
		}
	});
});