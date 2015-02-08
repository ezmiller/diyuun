/**
 * BookActions
 */

var OurDispatcher = require('../dispatcher/OurDispatcher.js');
var BookConstants = require('../constants/BookConstants.js');

var BookActions = {

	create: function(book) {
		console.log('BookActions::create() dispatching action');
		OurDispatcher.dispatch({
			actionType: BookConstants.BOOK_CREATE,
			book: book
		});
	},

} // BookActions

module.exports = BookActions;