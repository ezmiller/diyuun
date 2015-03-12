/**
 * PendingUserController
 *
 * @description :: Server-side logic for managing Pendingusers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res, next) {
		var name,
				invitee = req.allParams();

		// Parse the name into its parts.
		name = invitee.name.split(' ');
		delete invitee.name;
		invitee.firstName = name[0];
		invitee.lastName = name[1];

		// Create the pending user and send response.
		PendingUser.create(invitee, function(err, pending) {
			var link;

			if (err && err.code === 'E_VALIDATION') {
				req.session.flash = { 'err': err };
				return res.status(400).send({'err':err});
			}

			// Generate token & link
			link = 'http://' + req.headers.host + '/join/' + pending.id;

			// Respond with link.
			res.json({'joinLink': link});
		});

	},

	find: function(req, res, next) {
		PendingUser.findOne({id: req.params.token}, function(err,found) {
			if (err) {
				res.status(500);
			}
			if (_.isEmpty(found)) {
				return res.status(404).send(false);
			}
			res.json(found);
			next();
		});
	},

	// join: function(req, res, next) {
	// 	PendingUser.find({id: req.params.token}, function(err, found) {
	// 		if (err) {
	// 			console.log('PendingUserController::join  error: ', err);
	// 			res.status(500);
	// 		}
	// 		if ( _.isEmpty(found) ) {
	// 			return res.status(404).send(false);
	// 		}
	// 		res.redirect('/signup');
	// 	});
	// }

};

