'use strict';
/**
 * BookStore
 */

define(
[
	'ourDispatcher',
	'constants/BookConstants',
	'backbone',
	'underscore'
],
function(OurDispatcher, BookConstants, EventEmitter, Backbone, _) {

/**
 * Contains event name indicating view updates.
 * @type {String}
 */
var CHANGE_EVENT = 'sync';

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

	removeChangeListener: function(callback) {
		console.log('BookStore: remove change listener');
		this.on(CHANGE_EVENT, callback);
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
 * Create a new book
 * @param {object} book
 */
function create(book) {
	console.log('BookStore: Create new book.');
	BookStore.create(book);
};

return BookStore;

}); // define