/**
 * SourceController
 *
 * @description :: Server-side logic for managing Sources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  search: function(req, res, next) {
    var params = req.params.all(),
        sourceType = typeof req.param('id') === 'undefined' ? 'all' : req.param('id');
    
    params.type = sourceType;
    delete params.id;

    return WebSources.search(params)
      .then(function(results) {
        res.send(results);
      })
      .catch(function(reason) {
        console.log('WebSources search failed: ', reason);
      });

  }
  
};

