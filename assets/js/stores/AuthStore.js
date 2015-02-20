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
			console.log('AuthStore::initialize()');
			OurDispatcher.register(actionCallback);
		},

		getCurrentUser: function() {
			return ( this.currentUser ) ? this.currentUser: false;
		},

		isLoggedIn: function() {
			return ( this.currentUser ) ? true: false;
		},

		addLoginListener: function(callback) {
			console.log('AuthStore::addLoginListener()');
			this.on(AuthConstants.USER_LOGIN, callback);
		},

		removeLoginListener: function(callback) {
			console.log('AuthStore::removeLoginListener()');
			this.on(AuthConstants.USER_LOGIN, callback);
		},

	}) );

	function actionCallback(action) {
		console.log('AuthStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case AuthConstants.USER_LOGIN:
				AuthStore.set(action.user);
				console.log( 'LoggedIn User email: ', AuthStore.get('email') );
				break;
		}
	}

	module.exports = AuthStore;


}());