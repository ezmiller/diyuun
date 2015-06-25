/**
 * DiscussionController
 *
 * @description :: Server-side logic for managing discussions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findOne: function(req, res, next) {

		console.log('DiscussionController::findOne() ', req.params.all());

		Discussion
			.find(req.param('id'))
			.populate('comments')
			.then(function(found) {

				if (_.isEmpty(found)) {
					throw CustomErrors.createRecordNotFoundError('Unable to find discussion.');
				}

				return _.first(found);

			})
			.then(function(found) {
		
				Promise.all(found.comments.map(function(comment) {

					// For each comment get the user info and include in result.
					return User.find(comment.user).then(function(found) {
						if (_.isEmpty(found)) {
							throw CustomErrors.createRecordNotFoundError('Unable to find user while fetching discussion.');
						}
						comment.user = _.first(found);
						return;			
					}).catch(function(err) { throw err; });

				})).then(function() {

					res.send(found);

				}).catch(function(err) { throw err; });

			}).catch(function(err) {

				sails.log.error(err);

				if (err.name === 'RecordNotFoundError') {
					res.notFound(err.message);
				} else {
					res.serverError(err.message);
				}
			})

	}

};

