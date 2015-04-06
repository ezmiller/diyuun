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

		if ( _.isEmpty(invitee) || invitee.name === undefined) {
			return res.badRequest('Invalid paramaters provided when trying to create a new pending user.');
		}

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

	update: function(req, res, next) {
		var id = req.param('id');

		PendingUser.update(id, req.allParams(), function(err, updatedUser) {
			if (err) {
				sails.log.error(CustomErrors.createOnboardingError('Failed to update the pending user.'));
				return res.serverError({err: err});
			}
			res.send(updatedUser); // updatedUser will be an empty array if id was not found.
		});
	},

	save: function(req, res, next) {
		var id = req.param('id');

		// Respond with 400 if no id provided.
		if (id === undefined) {
			sails.log.error(CustomErrors.createMissingIdError('The id of the pending user to save was not provided.'));
			return res.send(400);
		}

		// Get pending user data.
		PendingUser.findOne(id, function(err, found) {

			console.log('pendinguser after findOne: ', found);

			// Respond with 500 if there was an error while finding pending user.
			if (err) {
				sails.log.error(CustomErrors.createOnboardingError('Failed to load pending user data while saving.'));
				return res.send(500);
			}

			// Respond with 400 if it was not possible to find the pending user.
			if (_.isEmpty(found)) {
				sails.log.error(CustomErrors.createOnboardingError('Unable to find pending user while saving.'));
				return res.send(400);
			}

			// Strip away attributes we don't want to update while saving new user.
			delete found.createdAt;
			delete found.updatedAt;
			delete found.id;

			User.update({email: found.email}, found, function(err, user) {
				if (err) {
					sails.log.error(CustomErrors.createOnboardingError('Failed to copy pending user data to new user while saving.'));
					return res.send(500);
				}
				// TODO: Delete user after save.
				res.send(user);

				// Delete the Pending User
				PendingUser.destroy({email: found.email}, function(err, deleted) {
					if (err) {
						sails.log.error(
							CustomErrors.createOnboardingError('Failed to delete the pending user while saving new user.')
						);
					}
				});

				res.send(_.first(user));
			});

		});

	},

};

