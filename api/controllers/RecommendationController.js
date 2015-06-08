/**
 * RecommendationController
 *
 * @description :: Server-side logic for managing recommendations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 * // TODO: Find a way to make create action code for creating new source more terse.
 * 
 */

module.exports = {

  find: function(req, res, next) {
    var user;

    userId = req.param('user');

    Recommendations.get(userId)
      .then(function(recommendations) {
        for (var i=0; i < recommendations.length; i++) {
          recommendations[i].id = recommendations[i].source.toString();
          delete recommendations[i].source;
        }
        res.send(recommendations);
      })
      .catch(function(err) {
        sails.log.error(err);
        if (err.name === 'RecordNotFoundError') {
          res.badRequest(err.message); 
        } else {
          res.serverError(err.message);
        }
      });
  },

  create: function(req, res, next) {
    var user = req.param('user'),
        source = req.param('source'),
        rating = req.param('rating'),
        text = req.param('text'),
        newRec;

    if ( !user || !source || !rating ) {
      return res.badRequest('Invalid paramaters supplied when trying to create a new recommendation.');
    }

    newRec = {
      'user': user.id,
      'discipline': user.discipline,
      'source': source.id,
      'rating': rating,
      'text': text
    };

    if ( source.websource ) {
      
      Source.create(source).then(function(newSource) {
        newRec.source = newSource.id;
        Recommendation.create(newRec).then(function(recommendation) {
          return res.send(recommendation);
        }).catch(function(err) { throw err });
      }).catch(function(reason) {
        sails.log.error(CustomErrors.createFailedToPersistError('Failed to create a new source when trying to create new recommendation.'));
        return res.serverError({err: reason});
      });

    } else {

      Recommendation.create(newRec).then(function(recommendation) {
        return res.send(recommendation);
      }).catch(function(err) { 
        sails.log.error(CustomErrors.createFailedToPersistError('Failed to create a new source when trying to create new recommendation.'));
        return res.serverError({err: reason});
      });

    }

  } 
  
};

