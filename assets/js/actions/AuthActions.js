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
				'actionType': AuthConstants.USER_LOGIN,
				'user': user
			});
		}

	}; // UserActions

	module.exports = AuthActions;
}());