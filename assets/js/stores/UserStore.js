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

		defaults: {
			'username': null,
			'password': null,
		},

		addFailedLoginListener: function(callback) {
			console.log('User::addFailedLoginListener()');
			this.on(LOGIN_FAILED, callback);
		},

		removeFailedLoginListener: function(callback) {
			console.log('User::addFailedLoginListener()');
			this.off(LOGIN_FAILED, callback);
		},

		addFailedRegistrationListener: function(callback) {
			console.log('User::addFailedRegistrationListener');
			this.on(REGISTRATION_FAILED, callback);
		},

		removeFailedRegistrationListener: function(callback) {
			console.log('User::removeFailedRegistrationListener');
			this.off(REGISTRATION_FAILED, callback);
		},

		login: function(user) {
			var self = this;

			console.log('UserStore::login() called with: ', user);

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local',
				data: user
			})
			.done(function(data, textStatus) {
				console.log('User::login() success with user: ', data);
				self.trigger(LOGIN_SUCCESS, data);
				self.currentUser = data;
				console.log(res);
			})
			.fail(function(jqXhr, textStatus, errorThrown) {
				self.trigger(LOGIN_FAILED, jqXhr, jqXhr.responseJSON);
			});
		},

		register: function(user) {
			var self = this;

			console.log('UserStore::register() called.');

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local/register',
				data: user
			})
			.done(function(data, textStatus) {
				console.log('User::register() success with user: ', data);
				self.trigger(REGISTRATION_SUCCEEDED, data);
			})
			.fail(function(jqXhr, textStatus, errorThrown) {
				console.log('User:register() failed with error: ', jqXhr);
				self.trigger(REGISTRATION_FAILED, jqXhr, jqXhr.responseJSON);
			});
		}

	});

	/**
	 * Holds the current logged in user.
	 * @type {Object}
	 */
	var _currentUser = new User();

	console.log('UserStore: _currentUser: ', _currentUser);

	// Define the Store as a Backbone collection.
	var UserStore = new (Backbone.Collection.extend({

		model: User,

		url: '/users',

		currentUser: _currentUser,

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
		switch(action.actionType) {
			case UserConstants.LOGIN_USER:
				_currentUser.login(action.user);
				break;
			case UserConstants.REGISTER_USER:
				_currentUser.register(action.user);
				break;
		}
	}

	module.exports = UserStore;

}());