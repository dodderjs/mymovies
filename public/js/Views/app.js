define([
	'jquery',
	'underscore',
	'backbone',
	'Collections/movies'
], function ($, _, Backbone, Movies) {

	return Backbone.View.extend({

		el: '#App',

		events: {
			'click #Footer .more': 'loadMore' 
		},

		initialize: function () {
			this.movies = Movies;
			$('#Footer .more').hide();
			this.scrollInit();
		},

		loadMore: function () {
			this.movies.fetch({ add: true, merge: true, remove: false , success: function (collection, response) {
				if (response.length < 50) {
					$(window).off('scroll');
					$('#Footer .more').hide();
				}
			}});
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

			if (this.movies.page > 2) {
				$(window).off('scroll');
				$('#Footer .more').show();
			}
		}
	});
});