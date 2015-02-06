/**
 * ErrorActions
 */

define(['ourDispatcher', 'constants/ErrorConstants'], function(OurDispatcher, ErrorConstants) {

var ErrorActions = {

	display: function(error) {
		console.log('ErrorActions::display() dispatching error action');
		OurDispatcher.dispatch({
			actionType: ErrorConstants.ERROR_DISPLAY,
			error: error
		});
	},

} // ErrorActions

return ErrorActions;

}); // define