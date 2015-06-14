/**
 * AuthConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var AuthConstants = keyMirror({
		loginUser: null,
		logoutUser: null
	});

	module.exports = AuthConstants;

}());