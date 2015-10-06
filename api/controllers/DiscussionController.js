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

	/**
	 * Get a discussion.
	 *
	 * (GET /discussions/:id)
	 */
	findOne: function(req, res, next) {

		console.log('DiscussionController::findOne() ', req.params.all());

		var getComments = function(comments) {
			return Promise.all(comments.map(function(comment) {
				return Comment
					.findOne(comment.id)
					.populate('likes')
					.populate('sources')
					.populate('discussions')
					.then(function(foundComment) {
						return foundComment;
					}).catch(function(err) { throw err; });
			}));
		};

		var getUserHash = function(comments) {
			var hash = {};
			return Promise.all(comments.map(function(comment) {
				return User.findOne(comment.user).then(function(foundUser) {
					hash[comment.id] = foundUser;
				}).catch(function(err) { throw err; });
			})).then(function() {
				return hash;
			}).catch(function(err) { throw err; });
		};

		Discussion
			.findOne(req.param('id'))
			.populate('comments')
			.populate('sources')
			.then(function(discussion) {
				var comments = getComments(discussion.comments)
					.then(function(comments) {
						return comments;
					}).catch(function(err) { throw err; });
				var userHash = getUserHash(discussion.comments)
					.then(function(hash) {
						return hash;
					})
				return [discussion, comments, userHash];
			})
			.spread(function(discussion, comments, userHash) {
				// Unable to set comments on object without cloning.
				var cloned  = _.clone(discussion);
				comments.forEach(function(comment) {
					comment.user = userHash[comment.id];
				});
				cloned.comments = comments;
				res.json(cloned);
			})
			.catch(function(err) {
				sails.log.error(err);
				if (err.name === 'RecordNotFoundError') {
					res.notFound(err.message);
				} else {
					res.serverError(err.message);
				}
			})

	}

};

