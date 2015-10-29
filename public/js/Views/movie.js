/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Views/movieDetails'
], function ($, _, Backbone, Details) {
	return Backbone.View.extend({
		
		tagName:  'li',

		template: _.template(
						'<div class="movie <%= fresh ? "new" : "" %>">'+
							'<figure>'+
								'<img src="<%= imageurl ? imageurl.small : "/images/noimage.jpg" %>" width="150" />'+
							'</figure>'+
							'<div class="movie-details">'+
								'<h4 title=""><%= title %></h4>' +
							'</div>'+
						'</div>'),

		events: {
			'click' : 'select'
		},

		details: null,
 	
	 	initialize: function(options) {
	 		_.bindAll(this, 'render');
	    	this.model.bind('change', this.render);

	    	this.details = new Details({ model: this.model });
	    },

	    render: function() {
	      this.$el.html(this.template(this.model.toJSON()));
	      return this;
	    },

	    select: function () {
	    	this.details.render();
	    }
	});
});