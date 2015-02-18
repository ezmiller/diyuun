/**
 * AuthConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var AuthConstants = keyMirror({
		LOGIN_USER: null,
		REGISTER_USER: null
	});

	module.exports = AuthConstants;

}());