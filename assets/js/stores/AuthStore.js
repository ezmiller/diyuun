/**
 * AuthStore
 */
(function() {
	'use strict';

	// Get necessary components.
	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var AuthConstants = require('../constants/AuthConstants.js');
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
	var AuthStore = new (Backbone.Model.extend({

		url: '/users',

		defaults: {
			'username': null,
			'password': null,
		},

		initialize: function() {
			console.log('AuthStore::initialize()');
			OurDispatcher.register(actionCallback);
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

	}) );

	function actionCallback(action) {
		switch(action.actionType) {
			case AuthConstants.LOGIN_USER:
				AuthStore.login(action.user);
				break;
			case AuthConstants.REGISTER_USER:
				AuthStore.register(action.user);
				break;
		}
	}

	module.exports = AuthStore;


}());