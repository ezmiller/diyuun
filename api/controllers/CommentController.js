/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	/**
	 * Create new comment
	 * 
	 * (POST /comments
	 */
	create: function(req, res) {
		var comment, invalidRequest;

		comment = {};
		comment.user = req.param('user');
		comment.text = req.param('text');
		comment.discussions = req.param('discussions');

		invalidRequest = _.some(comment, function(v,k) {
			return !v ? true : false;
		});

		if (invalidRequest === true) {
			return res.badRequest('Invali Request');
		}

		utils.userExists(comment.user).then(function(found) {

			if (found == false) {
				return res.badRequest('User not found when trying to create a new comment.');
			};

			Comment.create(comment).then(function(newComment) {
				return res.send(newComment);
			}).catch(function() { throw err; })

		}).catch(res.negotiate);
		
	}
	
};

