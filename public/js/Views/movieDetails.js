/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Collections/torrents',
	'Views/torrentList'
], function ($, _, Backbone, Torrents, TorrentsView) {
	return new (Backbone.View.extend({
		el: '#MovieDetails',

		template: _.template(
						'<div class="movieDetails">' +
							'<figure>' +
								'<a href="http://www.imdb.com/title/<%= id %>" target="_blank">' +
									'<img src="<%= imageurl ? imageurl.small : "/images/noimage.jpg" %>" width="200" />'+
								'</a>' +
							'</figure>' +
							'<div class="movie-info">'+
								'<h2><%= title %></h2>'+
								'<p><%= plot %></p>' +
								'<ul class="spec">' +
									'<li><strong>Released date:</strong> <%= new Date(release_date * 1000).toDateString() %></li>'+
									'<li><strong>Uploaded date:</strong> <%= new Date(lastupload * 1000).toDateString() %></li>'+
									'<li><strong>Rank:</strong> ' +
										'<a href="http://www.imdb.com/title/<%= id %>" target="_blank">' +
											'<%= imdb_rank %>' +
										'</a>' +
									'</li>'+
									'<li><strong>Runtime:</strong> <%= runtime %></li>'+
								'</ul>'+
							'</div>'+
							'<div id="Torrents"></div>' +
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

	    render: function(model) {
	    	this.model = model || this.model;

	    	this.$el.html(this.template( this.model.toJSON() )).show();

			this.torrentsView = new TorrentsView({ el: '#Torrents', collection: this.torrents });
			this.torrents.fetch({ 
				id: this.model.get('id'), 
				reset: true
			});
			
			return this;
	    },

	    close: function () {
	    	this.trigger('close');
	    	this.$el.hide();
	    }
	}))();
});