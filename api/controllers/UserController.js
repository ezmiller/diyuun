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
		User
		.findOne(req.param('id'))
		.populate('discussions')
		.populate('recommendations')
		.then(function(found) {
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

		file = req.file('avatar');
		avatarUrl = require('util').format('%s/user/%s/avatar', sails.getBaseUrl(), req.user.id);
		maxBytes = 10 * 1024; // 20 Kb

		if (typeof file === 'undefined') {
			res.badRequest('No avatar file sent when attempting to update user avatar.');
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
		}
	
};

