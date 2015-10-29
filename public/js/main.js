require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: 'libs/node_modules/jquery/dist/jquery.min',
		underscore: 'libs/node_modules/underscore/underscore-min',
		backbone: 'libs/node_modules/backbone/backbone-min',
		cookie: 'libs/node_modules/jquery.cookie/jquery.cookie',
		config: 'Configs/api'
	}
});

require([
	'backbone',
	'Views/app',
	'router',
	'cookie'
], function (Backbone, AppView, Workspace) {
	var workspace = new Workspace();

	Backbone.history.start();
	var app = new AppView();

});