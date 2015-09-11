/**
 * AuthConstants
 */
(function() {
	'use this';

	var keyMirror = require('keymirror');

	var AuthConstants = keyMirror({
		updateCurrentUser: null,
		updateCurrentUserAvatar: null,
		refreshCurrentUser: null,
	});

	module.exports = AuthConstants;

}());