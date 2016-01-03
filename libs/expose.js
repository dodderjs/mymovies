var _ = require('lodash'),
	vars = {};

module.exports = {
	set: function(key, value){
		if (typeof key !== 'string') {
			throw new Error('Key must be string');
		}

		if (typeof value === 'object') {
			value = _.clone(value);
		}

		if (typeof value === 'undefined') {
			delete vars[key];
		}

		vars[key] = value;
	},

	remove: function (key) {
		if (typeof key !== 'string') {
			throw new Error('Key must be string');
		}
		delete vars[key];
	},

	has: function(key){
		return vars.hasOwnProperty(key);
	},

	get: function(key){
		if (typeof key !== 'string') {
			throw new Error('Key must be string');
		}
		
		if (typeof vars[key] === 'object') {
			return _.clone(vars[key]);
		}

		return vars[key];
	},

	stringify: function(){
		return JSON.stringify(vars);
	}
};