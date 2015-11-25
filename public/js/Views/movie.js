/*global define*/
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	return Backbone.View.extend({
		
		tagName:  'li',

		template: _.template(
						'<div class="movie <%= fresh ? "new" : "" %> <%= poster ? "" : "no-image" %>">'+
							'<figure>'+
								'<img src="<%= poster ? poster.small : "/images/noimage.jpg" %>" width="150" />'+
							'</figure>'+
							'<div class="movie-details">'+
								'<h4><%= title %></h4>' +
								'<p>Release: <%= new Date(release_date*1000).toLocaleDateString() %></p>' +
								'<% if (pg) { %>' +
									'<p>PG: <%= pg %></p>' +
								'<% } %>' +
							'</div>'+
						'</div>'),

		events: {
			'click' : 'select'
		},

		details: null,
 	
	 	initialize: function(options) {
	 		_.bindAll(this, 'render');
	    	this.model.bind('change', this.render);
	    },

	    render: function() {
	      this.$el.html(this.template(this.model.toJSON()));
	      return this;
	    },

	    select: function () {
	    	this.model.trigger('select', this.model);
	    }
	});
});