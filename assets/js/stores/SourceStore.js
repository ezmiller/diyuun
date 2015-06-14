/**
 * SourceStore
 */
(function() {
	'use strict';

	// Get necessary components and libraries
	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var SourceConstants = require('../constants/SourceConstants.js');
	var Backbone = require('backbone');
	var $ = require('jquery');
	var _ = require('underscore');

	/**
	 * Contains event name indicating view updates.
	 * @type {String}
	 */
	var UPDATE = 'update';
	var RESET = 'reset';

	var Recommendation = Backbone.Model.extend({
		
		defaults: {
			id: '',
			rating: 0
		},

		initialize: function(props) {
			console.log('Recommendation::initailize()');
		}

	});

	var Recommendations = Backbone.Collection.extend({
	
		model: Recommendation,

		url: '/recommendations'

	});

	var Source = Backbone.Model.extend({

		url: function() {
			return '/sources'+this.id;
		},

		defaults: {
			id: '',
			type: '',
			title: '',
			authors: [],
			recommendations: [],
			subtitle: '',
			publisher: '',
			year: null,
			abstract: '',
			imageLinks: {},
			identifiers: [],
		},

	});

	var SourceStore = new (Backbone.Collection.extend({

		// The Url for books /api/models/Book.js
		url: '/books',

		model: Source,

		initialize: function() {
			console.log('SourceStore::initialize()');

			// Register store callback with dispatcher.
			OurDispatcher.register(actionCallback);

		},

		findOne: function(sourceId) {
			console.log('SourceStore::findone() called with: ', sourceId);
			var newSource = new Source();
			newSource.fetch({
				url: '/sources/'+sourceId,
				success: function(data) {
					this.reset(data);
					this.trigger(UPDATE, this);
				}.bind(this)
			});
			
		},

		getRecommendationsForUser: function(userId) {
			var recommendations;

			this.reset();
			recommendations = new Recommendations();

			recommendations.fetch({ 
				data: $.param({ 'user': userId }),
				success: function(collection, response, options) {
					this.parseRecommendations(collection)
						.then(function(models) {
							this.reset(models);
						}.bind(this));
				}.bind(this)
			});

		},

		parseRecommendations: function(collection) {
			var tmp;
			return Promise.all(collection.map(function(item) {
				return new Promise(function(resolve, reject) {
					item.fetch({
						url: '/sources/'+item.id,
						success: function(data) {
							resolve(item);
						}
					});
				});
			}));
		},

		addUpdateListener: function(callback) {
			this.on(UPDATE, callback);
		},

		removeUpdateListener: function(callback) {
			this.off(UPDATE, callback);
		},

		addResetListener: function(callback) {
			this.on(RESET, callback);
		},

		removeResetListener: function(callback) {
			this.off(RESET, callback);
		}

	}) );

	function actionCallback(action) {
		console.log('SourceStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case SourceConstants.getSource:
				SourceStore.findOne(action.payload);
				break;
			case SourceConstants.getRecommendations:
				SourceStore.getRecommendationsForUser(action.payload);
				break;
		}

	}

	module.exports = SourceStore;

}());
