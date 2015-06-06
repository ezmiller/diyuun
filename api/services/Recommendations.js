/**
 * Recommendations Service
 *
 * Note: This Service is highly incomplete at the moment!! 
 *
 * This service is responsible for providing recommendations to user and 
 * discipline feeds. Contained in this file are several components:
 * 
 *   - A base Recommender object that servers as an abstract class defining the 
 *   	 interface of all the other Recommenders.
 *   - An EditorRecommender object that gets recommendations based on recommendations from
 *     users who are editors.
 *   - A Recommendation object that serves as a filter component, getting recomemendations 
 *     from registered Recommender Engines, organizing them, and returning them through its
 *     get() method.
 *     
 */

(function() {
	'use strict';

	var extend,
			createRecommender,
			Recommendations,
			EditorRecommender, 
			Recommender;

	extend = function(child, parent) { 
		for (var key in parent) { 
			if (hasProp.call(parent, key)) child[key] = parent[key]; 
		} 
		function ctor() { 
			this.constructor = child; 
		} 
		ctor.prototype = parent.prototype; 
		child.prototype = new ctor(); 
		child.__super__ = parent.prototype; 
		return child; 
	}

	createRecommender = function(type) {
		switch(type) {
			case 'EditorRecommender':
				return new EditorRecommender();
			default:
				return false;
		}
	}

	Recommender = (function() {
	  function Recommender() {}

	  Recommender.prototype.type = 'Recommender';

	  Recommender.prototype.type = function() {
	  	return this.type;
	  };

	  Recommender.prototype.getRecommendationsFor = function(userId) {
	    return this.generateRecommendations(userId);
	  };

	  Recommender.prototype.generateRecommendations = function(userId) {
	  	throw CustomError.createRecommendationsError('generateRecommendations() method of Recommender prototype called.');
	  	return;
	  };

	  Recommender.prototype.getUser = function(userId) {
	  	return User.find({id: userId})
	  		.populate('discipline')
	  		.then(function(result) {

	  			if (result.length === 0) {
	  				throw CustomErrors.createRecordNotFoundError('Unable to find user record while fetching recommendations.');
	  				return;
	  			}

	  			return result[0];
	  		})
	  		.catch(function(err) {
	  			throw err;
	  		});
	  };

	  return Recommender;

	})();

	EditorRecommender = (function(superClass) {
	  extend(EditorRecommender, superClass);

	  function EditorRecommender() {
	    return EditorRecommender.__super__.constructor.apply(this, arguments);
	  }

	  EditorRecommender.prototype.generateRecommendations = function(userId) {
	  	var self = this;
	  	return this.getUser(userId)
	  		.then(function(user) {
	  			return Recommendation.find()
	  				.where({discipline: user.discipline.id})
	  				.groupBy('source')
	  				.sum('rating')
	  				.sort('rating ASC')
			  		// .populate('source')
			  		.then(function(result) {
			  			return result;	
			  		})
			  		.catch(function(err) {
			  			throw err;
			  		});
			  })
			  .catch(function(err) {
			  	throw err;
			  });
	  }

	  return EditorRecommender;

	})(Recommender);

	Recommendations = (function() {

	  var registeredEngines;

	  function Recommendations() {
	  	this.registeredEngines = [];
	  	this.registerRecommenders(sails.config.recommendations.engines);
	  }

	  Recommendations.prototype.registerRecommenders = function(engines) {
	  	var i, item, len, self;
	  	self = this;
	    
	    if (!engines) {
	    	sails.log.error('No engines listed in the recommendation configuration.');
	    }
	    
	    return engines.forEach(function(engine, index, array) {
	      return self.registeredEngines.push(createRecommender(engine.name));
	    });
	  };

	  Recommendations.prototype.get = function(userId) {
	  	var self = this;
	  	return new Promise(function(resolve,reject) {
				return Promise.all(self.registeredEngines.map(function(engine, index, array) {
	  				return engine.getRecommendationsFor(userId);
	  		}))
  			.then(function(result) {
  				resolve(result[0]);
  			})
  			.catch(function(err) {
  				reject(err);
  			});
			});
	  };

	  return Recommendations;

	})();

	module.exports = new Recommendations();

}());