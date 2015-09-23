/**
 * DiscussionController
 *
 * @description :: Server-side logic for managing discussions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res, next) {
		var newDiscussion, title, owner, prompt, isPrivate, isVisible, sources;

		title = req.param('title');
		prompt = req.param('prompt');
		owner = req.param('owner');
		isPrivate = req.param('isPrivate');
		isVisible = req.param('isVisible');
		sources = req.param('sources');

		console.log(req.params.all());

		if (title === undefined || prompt === undefined || owner === undefined || isPrivate === undefined || isVisible === undefined) {
			return res.badRequest('Invalid paramaters supplied when trying to create a new discussion.');
		}

		newDiscussion = {
			title: title,
			prompt: prompt,
			owner: owner,
			isPrivate: isPrivate,
			isVisible: isVisible
		};

		function handleError(err) {
			console.log(err.message);
			sails.log.error(CustomErrors.createFailedToPersistError('Failed to create a new discussion.'));
			return res.serverError(err);
		}

		Promise
			.resolve(sources !== undefined && _.isEmpty(sources) === false)
			.then(function(hasSources) {

				if (hasSources) {

					return utils.processWebSources(sources).then(function(processed) {
						newDiscussion.sources = processed;
						return newDiscussion;
					}).catch(function(err) { throw err; });

				} else { return newDiscussion; }

			})
			.then(function(discussion) {

				return Discussion.create(discussion).then(function(discussion) {
					return res.send(discussion);
				}).catch(function(err) { throw err; });

			})
			.catch(handleError);

	},

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

