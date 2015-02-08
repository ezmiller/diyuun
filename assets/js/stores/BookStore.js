'use strict';
/**
 * BookStore
 */

// Get necessary components and libraries
var OurDispatcher = require('../dispatcher/OurDispatcher.js');
var BookConstants = require('../constants/BookConstants.js');
var Backbone = require('backbone');
var _ = require('underscore');

// Tell backbone to use jQuery
Backbone.$ = $;

/**
 * Contains event name indicating view updates.
 * @type {String}
 */
var CHANGE_EVENT = 'sync';
var ERROR_EVENT = 'error';

// Define our BookStore as a Backbone Collection.
var BookStore = new (Backbone.Collection.extend({

	// The Url for books /api/models/Book.js
	url: '/books',

	initialize: function() {

		// Register store callback with dispatcher.
		OurDispatcher.register(actionCallback);

	},

	addChangeListener: function(callback) {
		console.log('BookStore: add change listener');
		this.on(CHANGE_EVENT, callback);
	},

	addErrorListener: function(callback) {
		console.log('BookStore: add error listener');
		// console.log(callback);
		this.on(ERROR_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		console.log('BookStore: remove change listener');
		this.off(CHANGE_EVENT, callback);
	},

	removeErrorListener: function(callback) {
		console.log('BookStore: remove error listener');
		this.off(ERROR_EVENT, callback);
	}

}) );

function actionCallback(action) {

	switch(action.actionType) {
		case BookConstants.BOOK_CREATE:
			create(action.book);
			break;
	}

}

/**
 * Takes a book object and tries to add it to the server DB
 * with `Backbone.Collection.create`.
 * @param {object}
 */
function create(book) {
	console.log('BookStore::create() Create new book.');
	BookStore.create(book);
}

module.exports = BookStore;
