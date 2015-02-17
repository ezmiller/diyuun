/**
 * UserActions
 */
(function() {
	'use strict';

	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var UserConstants = require('../constants/UserConstants.js');

	var UserActions = {

		login: function(user) {
			console.log('UserActions::login() dispatching action with: ', user);
			OurDispatcher.dispatch({
				'actionType': UserConstants.LOGIN_USER,
				'user': user
			});
		},

		register: function(user) {
			console.log('UserActions::register() dispatching action with user: ', user);
			OurDispatcher.dispatch({
				'actionType': UserConstants.REGISTER_USER,
				'user': user
			});
		},

	}; // UserActions

	module.exports = UserActions;
}());