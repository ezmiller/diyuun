/**
 * AuthConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var AuthConstants = keyMirror({
		USER_LOGIN: null,
		USER_LOGOUT: null
	});

	module.exports = AuthConstants;

}());