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
									'<img src="<%= poster ? poster.small : "/images/noimage.jpg" %>" width="200" />'+
								'</a>' +
							'</figure>' +
							'<div class="movie-info">'+
								'<h2><a href="http://www.imdb.com/title/<%= id %>" target="_blank"><%= title %></a></h2>'+
								'<p><%= plot %></p>' +
								'<ul class="spec">' +
									'<li><strong>Released date:</strong> <%= new Date(release_date * 1000).toDateString() %></li>'+
									'<% if (lastupload) { %>' +
										'<li><strong>Uploaded date:</strong> <%= new Date(lastupload * 1000).toDateString() %></li>'+
									'<% } %>' +
									'<li><strong>Rank:</strong> ' +
										'<a href="http://www.imdb.com/title/<%= id %>" target="_blank">' +
											'<%= imdb_rank %>' +
										'</a>' +
									'</li>'+
									'<li><strong>Runtime:</strong> <%= runtime %></li>'+
								'</ul>'+
							'</div>'+
							
							'<% if (imdb_videoid) { %>' +
							'<iframe id="ImdbVideo" ' +
								'src="http://www.imdb.com/video/imdb/<%= imdb_videoid %>/imdb/embed?autoplay=false&width=480" ' +
								'width="480" height="270" ' +
								'allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" ' +
								'frameborder="no" scrolling="no"></iframe>' +
							'<% } %>' +

							'<div id="Torrents"></div>' +
							'<% if (poster) { %>' +
								'<img src="<%= poster.small %>" class="detailsBg" />' +
							'<% } %>' +
						'</div>'),

		events: {
			'click' : 'close'
		},

		torrents: null,
 	
	 	initialize: function(options) {
			this.torrents = Torrents;
			this.torrentsView = new TorrentsView({ el: '#Torrents', collection: this.torrents });
	    },

	    render: function(model) {
	    	this.model = model || this.model;

	    	this.$el.html(this.template( this.model.toJSON() )).show();

			this.torrentsView.el = '#Torrents';
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
