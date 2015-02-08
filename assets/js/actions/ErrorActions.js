/**
 * ErrorActions
 */

var OurDispatcher = require('../dispatcher/OurDispatcher.js');
var ErrorConstants = require('../constants/ErrorConstants.js');

var ErrorActions = {

	display: function(error) {
		console.log('ErrorActions::display() dispatching error action');
		OurDispatcher.dispatch({
			actionType: ErrorConstants.ERROR_DISPLAY,
			error: error
		});
	},

} // ErrorActions

module.exports = ErrorActions;