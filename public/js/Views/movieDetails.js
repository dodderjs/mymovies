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
								'<a href="http://www.imdb.com/title/<%= id %>" target="_blank">' +
									'<img src="<%= imageurl ? imageurl.small : "/images/noimage.jpg" %>" width="150" />'+
								'</a>' +
							'</figure>' +
							'<div class="movie-info">'+
								'<h2><%= title %></h2>'+
								'<h4><%= hu_title %></h4>'+
								'<p><%= plot %></p>' +
								'<ul class="spec">' +
									'<li>Released date: <%= new Date(release_date * 1000).toDateString() %></li>'+
									'<li>Uploaded date: <%= new Date(lastupload * 1000).toDateString() %></li>'+
									'<li>Rank: ' +
										'<a href="http://www.imdb.com/title/<%= id %>" target="_blank">' +
											'<%= imdb_rank %>' +
										'</a>' +
									'</li>'+
									'<li>Runtime: <%= runtime %></li>'+
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