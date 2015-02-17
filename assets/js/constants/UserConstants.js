/**
 * UserConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var UserConstants = keyMirror({
		LOGIN_USER: null,
		REGISTER_USER: null
	});

	module.exports = UserConstants;

}());