/**
 * DiscussionConstants
 */
/*jslint node:true*/
(function() {
	'use strict';

	var keyMirror = require('keymirror');

	var DiscussionConstants = keyMirror({
		createDiscussion: null,
		getDiscussions: null,
		addComment: null,
	});

	module.exports = DiscussionConstants;

}());
