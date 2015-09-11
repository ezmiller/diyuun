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
		getDiscussionsForSource: null,
		addComment: null,
		updateComment: null,
		deleteComment: null,
		followDiscussion: null,
		unfollowDiscussion: null
	});

	module.exports = DiscussionConstants;

}());
