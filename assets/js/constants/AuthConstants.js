/**
 * AuthConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var AuthConstants = keyMirror({
		updateCurrentUser: null,
		updateCurrentUserAvatar: null,
	});

	module.exports = AuthConstants;

}());