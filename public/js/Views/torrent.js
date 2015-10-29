/*global define*/
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	return Backbone.View.extend({
		tagName: 'tr',
		template: _.template(
						'<td><%= type %></td>'+
						'<td><%= threeD %></td>' +
						'<td><%= new Date(uploaded * 1000).getFullYear() %>-<%= new Date(uploaded * 1000).getMonth() %>-<%= new Date(uploaded * 1000).getDate() %></td>' +
						'<td><%= Math.round(size / 1024 / 1024 * 100) / 100 %> GB</td>'+
						'<td><%= downloads %></td>'+
						'<td><%= seed %></td>'+
						'<td><%= leach %></td>'
					),
 	
	 	initialize: function() {
	      _.bindAll(this, 'render');
	    	this.model.bind('change', this.render);
	    },
	    
	    render: function() {
	      this.$el.html(this.template(this.model.toJSON()));
	      return this;
	    }
	});
});