/**
 * RecommendationStore
 */
(function() {
	'use strict';

	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var RecommendationConstants = require('../constants/RecommendationConstants.js');
	var Actions = require('../actions/Actions.js');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var UPDATE_EVENT = 'update';

	var Recommendation = Backbone.Model.extend({
		
		defaults: {
			id: '',
			rating: 0
		},

		initialize: function(props) {
			console.log('Recommendation::initailize()');
		}

	});

	var RecommendationStore = new (Backbone.Collection.extend({
	
		model: Recommendation,

		url: '/recommendations',

		initialize: function() {
			console.log('RecommendationStore::initailize()');
			var self;

			self = this;

			OurDispatcher.register(actionCallback);
			
		},

		update: function(userId) {
			var self = this;
			if (this.length > 0) {
				self.trigger(UPDATE_EVENT, this.getRecommendations());
			} else {
				this.fetch({ 
					data: $.param({ 'user': userId }),
					success: function(collection, response, options) {
						self.trigger(UPDATE_EVENT, self.getRecommendations());
					}
				});
			}
		},

		getRecommendations: function() {
			return this.models ? this.models : false;
		},

		addUpdateListener: function(callback) {
			console.log('RecommendationStore::addUpdateListener()');
			this.on(UPDATE_EVENT, callback);
		},

		removeUpdateListener: function(callback) {
			console.log('RecommendationStore::removeUpdateListener()');
			this.off(UPDATE_EVENT, callback);
		}

	}));

	function actionCallback(action) {
		console.log('RecommendationStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case RecommendationConstants.getRecommendations:
				RecommendationStore.update(action.payload)
				break;
		}
	}

	module.exports = RecommendationStore;

}());