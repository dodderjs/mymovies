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
						'<td><%= !compression ? "unknown" : compression %></td>'+
						'<td><%= threeD ? "3D" : "2D"%></td>' +
						'<td><%= new Date(uploaded * 1000).getFullYear() %>-<%= new Date(uploaded * 1000).getMonth() %>-<%= new Date(uploaded * 1000).getDate() %></td>' +
						'<td><%= Math.round(size / 1024 / 1024 * 100) / 100 %> GB</td>'+
						'<td><a href="https://ncore.cc/torrents.php?action=details&id=<%= id %>">Details</a></td>'+
						'<td><a href="https://ncore.cc/torrents.php?action=download&id=<%= id %>">DOWNLOAD</a></td>'
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