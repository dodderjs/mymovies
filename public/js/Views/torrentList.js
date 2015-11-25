/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'Views/torrent'
], function ($, _, Backbone, TorrentView) {
	return Backbone.View.extend({
		
		collection: null,

		template: _.template(
				'<table class="torrents">'+
					'<thead>' +
						'<th>Type</th>'+
						'<th>Compression</th>'+
						'<th>3D</th>'+
						'<th>Uploaded</th>'+
						'<th>Size</th>'+
						'<th>Detail</th>'+
						'<th>Download</th>' +
					'</thead>' +
					'<tbody>' +
					'</tbody>' +
				'</table>'),
 	
	 	initialize: function(options) {
			this.collection = options.collection;
			
			_.bindAll(this, 'render');
			this.collection.on('reset', this.render);
	    },

	    // Re-render the contents of the todo item.
	    render: function() {
	    	var element = $(this.el).html(this.template());

			this.collection.forEach(function(item) {
				var torrentView = new TorrentView({
					model: item
				});

				element.find('tbody').append(torrentView.render().el);
			}, this);
	    	return this;
	    }
	});
});