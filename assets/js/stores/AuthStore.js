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

	var LOGIN = 'login';
	var LOGOUT = 'logout';

	/**
	 * A model for the individual user. Also contains a series of method 
	 * that handle user authorization and that the Login and Registration
	 * components hook into.
	 */
	var AuthStore = new (Backbone.Model.extend({

		urlRoot: '/users',

		defaults: {
			id: '',
			username: '',
			email: '',
		},

		initialize: function() {
			var that = this;
			console.log('AuthStore::initialize()');

			// Register store with dispatcher.
			OurDispatcher.register(actionCallback);

			// Check if a user is logged in. If so, set.
			$.ajax({url: '/authorized'})
				.done(function(user) {
					console.log('Logged in?:', user);
					that.set(user);
				});

		},

		getCurrentUserId: function() {
			return this.get('id');
		},

		getCurrentUser: function() {
			var u = this.toJSON();
			return ( u ) ? u : false;
		},

		isLoggedIn: function() {
			console.log(this.getCurrentUserId());
			return ( this.getCurrentUserId() ) ? true: false;
		},

		addLoginListener: function(callback) {
			console.log('AuthStore::addLoginListener()');
			this.on(LOGIN, callback);
		},

		removeLoginListener: function(callback) {
			console.log('AuthStore::removeLoginListener()');
			this.off(LOGIN, callback);
		},

		addLogoutListener: function(callback) {
			this.on(LOGOUT, callback);
		},

		removeLogoutListener: function(callback) {
			this.off(LOGOUT, callback);
		}

	}) );

	function actionCallback(action) {
		console.log('AuthStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case AuthConstants.USER_LOGIN:
				AuthStore.set(action.user);
				AuthStore.trigger(LOGIN);
				break;
			case AuthConstants.USER_LOGOUT:
				AuthStore.clear();
				AuthStore.trigger(LOGOUT);
		}
	}

	module.exports = AuthStore;


}());