/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	/**
	 * Send a single user record back to the client
	 *
	 * (GET /users/:id)
	 */
	findOne: function(req, res, next) {
		var id, username, queryTerm;

		id = req.param('id');
		username = req.param('username');

		if (typeof id == 'undefine' || username == 'undefined') {
			return res.badRequest('Invalid parameters: no user id or username supplied when trying to get user.');
		}

		queryTerm = typeof id == 'undefined' ? {'username': username} : id;

		User
		.findOne(queryTerm)
		.populate('discussions')
		.populate('recommendations')
		.populate('followedDiscussions')
		.then(function(found) {
			delete found.passports;
			res.send(found);
		})
		.catch(function(err) {
			res.negotiation(err);
		});
	},

	/**
	* Upload avatar for currently logged-in user
	*
	* (POST /user/avatar)
	*/
	updateAvatar: function(req, res, next) {
		var file, avatarUrl, maxBytes;

		if (typeof req.user === 'undefined') {
			return res.serverError('Attempting to update user avatar when user is not logged in.');
		}

		file = req.file('avatar');
		avatarUrl = require('util').format('%s/user/%s/avatar', sails.getBaseUrl(), req.user.id);
		maxBytes = 10 * 1024; // 20 Kb

		if (typeof file === 'undefined') {
			return res.badRequest('No avatar file sent when attempting to update user avatar.');
		}

		utils.uploadFile(file, maxBytes).then(function(uploaded) {
			
			User.update(req.user.id, {
				'avatarFd': uploaded[0].fd,
				'avatar': avatarUrl
			}).then(function(user) {
				return res.ok();
			}).catch(function(err) { throw err;} );

		}).catch(function(err) {
			return res.negotiate(err);
		});

	},

	/**
	* Download avatar of the user with the specified id
	*
	* (GET /user/:id/avatar)
	*/
	avatar: function (req, res) {

	  req.validate({
	    id: 'string'
	  });

	  User.findOne(req.param('id')).exec(function (err, user){
			if (err) return res.negotiate(err);
			if (!user) return res.notFound();

			// User has no avatar image uploaded.
			// (should have never have hit this endpoint and used the default image)
			if (!user.avatarFd) {
			  return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk(/* optional opts */);

			// Stream the file down
			fileAdapter.read(user.avatarFd)
			.on('error', function (err){
			  return res.serverError(err);
			})
			.pipe(res);
		});
	},

	/**
	 * Sets a follow discussion on the specified user.
	 *
	 * (GET /user/:userId/follow/discussion/:discussionId)
	 */
	followDiscussion: function(req, res) {
		var userId, discussionId;

		userId = req.param('userId');
		discussionId = req.param('discussionId');

		Promise.all([
			utils.userExists(userId),
			utils.discussionExists(discussionId)
		]).then(function(results) {
			
			if (_.some(results, function(v) { return v == false })) {
				return res.badRequest('Invalid request: either the user or discussion does not exist.');
			}

			return User.findOne(userId)
				.populate('followedDiscussions')
				.then(function(found) {
					return found;
				}).catch(function(err) { throw err; });

		}).then(function(user) {

			user.followedDiscussions.push(discussionId);

			User.update(userId, {'followedDiscussions': user.followedDiscussions})
				.then(function(success) {
					
					if (_.isEmpty(success)) {
						throw new Error('Something went wrong while trying to set a follow discussion on user.');
					}

					return res.ok();

				}).catch(function(err) { throw err; });

		}).catch(res.negotiate);

	},

	/**
	 * Removes a follow discussion on the specified user.
	 *
	 * (GET /user/:userId/unfollow/discussion/:discussionId)
	 */
	unfollowDiscussion: function(req, res) {
		var userId, discussionId;

		userId = req.param('userId');
		discussionId = req.param('discussionId');

		Promise.all([
			utils.userExists(userId),
			utils.discussionExists(discussionId)
		]).then(function(results) {

			if (_.some(results, function(v) { return v == false })) {
				return res.badRequest('Invalid request: either the user or discussion does not exist.');
			}

		}).then(function() {

			return User.findOne(userId)
				.populate('followedDiscussions')
				.then(function(found) {
					return found.followedDiscussions;
				}).catch(function(err) { throw err; });

		}).then(function(followedDiscussions) {

			var newFollowed = followedDiscussions.filter(function(v) {
				return v.id != discussionId;
			});

			User.update(userId, {'followedDiscussions': newFollowed})
				.then(function(success) {
					
					if (_.isEmpty(success)) {
						throw new Error('Something went wrong while trying to set a follow discussion on user.');
					}

					return res.ok();

				}).catch(function(err) { throw err; });

		}).catch(res.negotiate);
	}
	
};

