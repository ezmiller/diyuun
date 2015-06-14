/**
 * SourceStore
 */
(function() {
	'use strict';

	// Get necessary components and libraries
	var OurDispatcher = require('../dispatcher/OurDispatcher.js');
	var SourceConstants = require('../constants/SourceConstants.js');
	var Backbone = require('backbone');
	var _ = require('underscore');

	/**
	 * Contains event name indicating view updates.
	 * @type {String}
	 */
	var UPDATE = 'update';

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

		addUpdateListener: function(callback) {
			this.on(UPDATE, callback);
		},

		removeUpdateListener: function(callback) {
			this.off(UPDATE, callback);
		}

	}) );

	function actionCallback(action) {
		console.log('SourceStore::actionCallback() called with:', action);
		switch(action.actionType) {
			case SourceConstants.getSource:
				SourceStore.findOne(action.payload);
				break;
		}

	}

	module.exports = SourceStore;

}());
