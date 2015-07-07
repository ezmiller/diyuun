/**
 * Discussion Store
 */
/*jslint node:true*/
(function() {
	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var DiscussionConstants = require('../constants/DiscussionConstants.js');

	/** Event constants for Backbone Events */
	var ERROR = 'error';
	var RESET = 'reset';

	var Comment = Backbone.Model.extend({

		url: '/comments',

		defaults: {
			user: '',
			text: '',
			discussions: [],
			sources: []
		}

	});

	var Discussion = Backbone.Model.extend({

		url: '/discussions',

		defaults: {
			owner: '',
	    members: [],
	  	comments: [],
	    private: true,
	    visible: false,
	    title: '',
	    prompt: ''
		}

	});

	var DiscussionStore = new (Backbone.Collection.extend({

		model: Discussion,

		url: '/discussions',

		initialize: function() {
			console.log('DiscussionStore::initialize()');

			// Register store callback with dispatcher.
			OurDispatcher.register(actionCallback);

			this.trigger('all', function(errorName) {
				console.log(errorName);
			});

		},

		addEventListener: function(event, callback) {
			console.log('DiscussionStore::addEventListener() called', {event: event, callback: callback});
			this.on(event, callback);
		},

		removeEventListener: function(event, callback) {
			this.off(event, callback);
		},

		createDiscussion: function(props) {
			var discussion;
			discussion = new Discussion;
			discussion.save(props, {
				error: function(model, err) {
					this.trigger('error', err);
				}.bind(this)
			});
			this.reset(discussion);
		},

		addComment: function(attrs) {
			var comment, currDiscussion;

			console.log('DiscussionStore::addComment():', comment);

			comment = new Comment;
			comment.save(attrs, {
				error: function(model, err) {
					this.trigger(ERROR, err);
				}.bind(this)
			});

			return;

		},

		getDiscussions: function(discussionIds) {
			var self;

			// Handle string as well as array in arg.
			if (typeof discussionIds === 'string') {
				discussionIds = [ discussionIds ];
			}

			return Promise.all(

				discussionIds.map(function(id) {
					var discussion = new Discussion;
					
					return new Promise(function(resolve, reject) {
						discussion.fetch({
							url: '/discussions/'+id,
							success: function(data) {
								console.log({discussion:discussion});
								resolve(discussion);
							},
							error: function(model, error) {
								reject(error);
							}
						});
					});

				}

			))
			.then(function(result) {

				// Triggers reset action that passes data to all listening.
				this.reset(result);

				console.log(this);

			}.bind(this))
			.catch(function(err) {

				this.trigger(ERROR, err);

			}.bind(this));
		},

	}));

	function actionCallback(action) {
		console.log('DiscussionStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case DiscussionConstants.createDiscussion:
				DiscussionStore.createDiscussion(action.payload);
				break;
			case DiscussionConstants.getDiscussions:
				DiscussionStore.getDiscussions(action.payload);
				break;
			case DiscussionConstants.addComment:
				DiscussionStore.addComment(action.payload);
				break;
		}

	}

	module.exports = DiscussionStore;
	
	
	

}());