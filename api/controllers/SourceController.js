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

		// First search for the source in local db.
		Source.find().where(params).then(function(found) {
			
			if (found.length !== 0) {
				return found;
			}

			params.type = sourceType;
			delete params.id;

			WebSources.search(params)
				.then(function(result) {
					res.send(result);
				})
				.catch(function(reason) {
					console.log('WebSources search failed: ', reason);
				});

		}).catch(function(reason) {
			console.log(reason);
		});

	}
	
};

