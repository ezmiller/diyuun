/**
 * BookStore
 */

define(
[
	'ourDispatcher',
	'constants/BookConstants',
	'eventEmitter',
	'underscore'
],
function(OurDispatcher, BookConstants, EventEmitter, _) {

var CHANGE_EVENT = 'change';

var _books = {};

/**
 * Create a new book
 * @param {object} book
 */
function create(book) {
	console.log('BookStore: Create new book.');
	// TODO: Write BookStore's create(book) function.
};

var BookStore = _.extend({}, EventEmitter.prototype, {

	/**
	 * Get the entire collection of books
	 * @return {object}
	 */
	getAll: function() {
		return _books;
	},

	emitChange: function(evt) {
		console.log('BookStore: Emit change');
		this.emit(evt);
	},

	addChangeListener: function(callback) {
		console.log('BookStore: add change listener');
		this.addListener(BookConstants.BOOK_CREATE, callback)
	},

	removeChangeListener: function() {
		console.log('BookStore: remove change listener');
		this.removeListener(BookConstants.BOOK_CREATE, callback);
	}

});// BookStore

OurDispatcher.register(function(action) {

	console.log('BookStore callback called with: ', action);

	switch(action.actionType) {
		case BookConstants.BOOK_CREATE:
			console.log('BookStore: BOOK_CREATE callback called');
			BookStore.emitChange(BookConstants.BOOK_CREATE);
			break;
	}

});

return BookStore;

}); // define