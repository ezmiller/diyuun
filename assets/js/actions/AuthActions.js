/**
 * UserActions
 */
(function() {
	'use strict';

	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var AuthConstants = require('../constants/AuthConstants.js');

	var AuthActions = {

		login: function(user) {
			console.log('UserActions::login() dispatching action with: ', user);
			OurDispatcher.dispatch({
				'actionType': AuthConstants.LOGIN_USER,
				'user': user
			});
		},

		register: function(user) {
			console.log('UserActions::register() dispatching action with user: ', user);
			OurDispatcher.dispatch({
				'actionType': AuthConstants.REGISTER_USER,
				'user': user
			});
		},

	}; // UserActions

	module.exports = AuthActions;
}());