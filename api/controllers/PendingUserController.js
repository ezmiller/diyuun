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

    if (!req.params.token) {
      return res.badRequest('No pending user token provided.');
    }

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
    var id= req.param('token'),
        updateVals = _.clone(req.allParams());

    // Remove token so it is not saved to db.
    delete updateVals.token;

    if (!id) {
      return res.badRequest('No pending user token provided.');
    }
    
    PendingUser.update(id, updateVals, function(err, updated) {
      var updatedUser = updated ? _.first(updated) : null;

      if (err) {
        sails.log.error(CustomErrors.createOnboardingError('Failed to update the pending user.'));
        return res.serverError({err: err});
      }

      if (_.isEmpty(updatedUser)) {
        sails.log.warn(CustomErrors.createOnboardingError('Non-matching, possibly invalid, token sent.'));
        return res.badRequest('No user matched token provided, token may be invalid.');
      }

      res.send(updatedUser);
    });
  },

  save: function(req, res, next) {
    var id = req.param('id');

    // Respond with 400 if no id provided.
    if (id === undefined) {
      sails.log.error(CustomErrors.createMissingIdError('The id of the pending user to save was not provided.'));
      return res.badRequest();
    }

    PendingUser.findOne().where({id: id}).then(function(found) {
      if (_.isEmpty(found)) {
        throw CustomErrors.createOnboardingError('Unable to find pending user, token may be invalid');
      }
      return found;
    }).then(function(pendingUser) {

      // Strip away attributes we don't want to update while saving new user.
      delete pendingUser.createdAt;
      delete pendingUser.updatedAt;
      delete pendingUser.id;

      // Copy the pending user data to the user model.
      return User.update({email: pendingUser.email}, pendingUser).then(function(updated) {
        
        if (_.isEmpty(updated)) {
          throw CustomErrors.createOnboardingError('Failed to locate new user stub when trying to save pending user.');
          return;
        }

        if (updated.length > 1) {
          throw CustomErrors.createOnboardingError('Server found multiple new user stubs matching a pending user. Save aborted.');
          return;
        }

        return _.first(updated);

      }).catch(function(err) { throw err; });

    }).then(function(newUser) {

        PendingUser.destroy({email: newUser.email}).exec(function(err) {

          if (err) {
            throw CustomErrors.createOnboardingError('Failed to delete pending user.');
            return;
          }

          res.send(newUser);  // Everything worked, so send new user back to client.
          
        });
        
    }).catch(function(err) {

      sails.log.error(err);
      res.serverError();

    });

  },

};

