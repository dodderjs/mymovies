/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Collections/torrents',
	'Views/torrentList'
], function ($, _, Backbone, Torrents, TorrentsView) {
	return Backbone.View.extend({
		el: '#MovieDetails',

		template: _.template(
						'<div class="movieDetails">' +
							'<figure>' +
								'<img src="<%= imageurl ? imageurl.small : "/images/noimage.jpg" %>" width="150" />'+
							'</figure>' +
							'<div class="movie-info">'+
								'<h2 title="<%= title %>"><%= title %></h2>'+
								'<ul class="spec">' +
									'<li>Uploaded: <%= lastupload %></li>'+
									'<li>Rank: <%= imdb_rank %></li>'+
								'</ul>'+
								'<div id="Torrents"></div>' +
							'</div>'+
							'<% if (imageurl) { %>' +
								'<img src="<%= imageurl.original %>" class="detailsBg" />' +
							'<% } %>' +
						'</div>'),

		events: {
			'click' : 'close'
		},

		torrents: null,
 	
	 	initialize: function(options) {
			this.torrents = Torrents;
	    },

	    render: function() {
	    	this.$el.html(this.template( this.model.toJSON() )).show();

			this.torrentsView = new TorrentsView({ el: '#Torrents', collection: this.torrents });
			this.torrents.fetch({ 
				id: this.model.get('id'), 
				reset: true
			});
			
			return this;
	    },

	    close: function () {
	    	this.$el.hide();
	    }
	});
});