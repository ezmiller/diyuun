/**
 * User Store
 */
(function() {
	'use strict';

	// Get necessary components.
	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var UserConstants = require('../constants/UserConstants.js');
	var Backbone = require('backbone');
	var _ = require('underscore');

	// Tell backgone to use jQuery
	Backbone.$ = $;

	var REGISTRATION_FAILED = 'registration:failed';
	var REGISTRATION_SUCCEEDED = 'registration:succeeded';
	var LOGIN_FAILED = 'login:failed';
	var LOGIN_SUCCESS = 'login:succes';

	/**
	 * A model for the individual user. Also contains a series of method 
	 * that handle user authorization and that the Login and Registration
	 * components hook into.
	 */
	var User = Backbone.Model.extend({

		url: '/users',

	});

	// Define the Store as a Backbone collection.
	var UserStore = new (Backbone.Collection.extend({

		model: User,

		url: '/users',

		/**
		 * Registers the UserStore with the dispatcher
		 * and passes the dispatcher a callback containing
		 * that handles each action listed in UserActions.
		 */
		initialize: function() {
			console.log('UserStore::UserStore::initialize()');
			OurDispatcher.register(actionCallback);
		},

	}) );

	function actionCallback(action) {
		console.log('UserStore::actionCallback() called');
	}

	module.exports = UserStore;

}());