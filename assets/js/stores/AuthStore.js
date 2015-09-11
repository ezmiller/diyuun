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
	var $ = require('jquery');

	var LOGIN = 'login';
	var LOGOUT = 'logout';
	var UPDATE = 'update';
	var ERROR = 'error';

	/**
	 * A model for the individual user. Also contains a series of method 
	 * that handle user authorization and that the Login and Registration
	 * components hook into.
	 */
	var AuthStore = new (Backbone.Model.extend({

		url: function() {
			return '/users/' + this.get('id');
		},

		defaults: {
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			role: '',
			title: '',
			affiliation: '',
			bio: '',
			discipline: '',
			interests: '',
			avatar: '',
			avatarFd: '',
			recommendations: [],
  		discussions: [],
  		followedDiscussions: []
		},

		dispatcherToken: null,

		isAuthorized: false,

		initialize: function() {
			var that = this;
			console.log('AuthStore::initialize()');

			// Register store with dispatcher.
			this.dispatcherToken = OurDispatcher.register(actionCallback);

			// Check if a user is logged in. If so, set.
			// $.ajax({url: '/authorized'})
			// 	.done(function(user) {
			// 		console.log('auth result:', user);
			// 		if ( user ) {
			// 			that.set(user);
			// 			that.trigger(LOGIN);
			// 		}
			// 	});
			
			this.authorize();

		},

		authorize: function() {
			this.fetch({
				url: '/authorized'
			}).done(function(authorized) {
				if (authorized !== false) {
					this.isAuthorized = true;
					this.trigger(LOGIN, this.toJSON());
				}
			}.bind(this));
		},

		refreshCurrentUser: function() {
			return this.fetch({url: '/authorized'}).done(function(data) {
				this.trigger(UPDATE, this.toJSON());
			}.bind(this));
		},

		getCurrentUser: function() {
			return (this.isAuthorized === true) ? this.toJSON() : false;
		},

		updateCurrentUser: function(attr) {
			this.set(attr);
			this.sync('update', this).done(function(data) {
				this.trigger(UPDATE, this.toJSON());
			}.bind(this));
		},

		updateAvatar: function(file) {
			var currUser;

			// Create FormData object in order to pass data via ajax.
			var data = new FormData();
			data.append('avatar', file);

			$.ajax({
				type: 'POST',
				url: '/user/avatar',
				data: data,
				contentType: false,
				processData: false,
				cache: false
			}).done(function() {
				this.refeshCurrentUser().done(function() {
					this.trigger(UPDATE, this.toJSON());	
				}.bind(this));
			}.bind(this)).fail(function(jqXhr) {
				this.trigger(ERROR, jqXhr);
			}.bind(this));

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
		},

		addUpdateListener: function(callback) {
			this.on(UPDATE, callback);
		},

		removeUpdateListener: function(callback) {
			this.off(UPDATE, callback);
		},

		addErrorListener: function(callback) {
			this.on(ERROR, callback);
		},

		removeErrorListener: function(callback) {
			this.off(ERROR, callback);
		}

	}) );

	function actionCallback(action) {
		console.log('AuthStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case AuthConstants.updateCurrentUser:
				AuthStore.updateCurrentUser(action.payload);
				break;
			case AuthConstants.updateCurrentUserAvatar:
				AuthStore.updateAvatar(action.payload);
				break;
			case AuthConstants.refreshCurrentUser:
				AuthStore.refreshCurrentUser();
				break;
		}
	}

	module.exports = AuthStore;


}());