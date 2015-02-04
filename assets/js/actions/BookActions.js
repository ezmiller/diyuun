/**
 * BookActions
 */

define(['ourDispatcher', 'constants/BookConstants'], function(OurDispatcher, BookConstants) {

var BookActions = {

	create: function(book) {
		console.log('BookActions::create() dispatching action');
		OurDispatcher.dispatch({
			actionType: BookConstants.BOOK_CREATE,
			book: book
		});
	},

} // BookActions

return BookActions;

}); // define