/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

	// Load passport providers.
	// Part of sails-generate-auth passport setup
	sails.services.passport.loadStrategies();

	username = 'admin@example.org';

	User.findOrCreate({email: username}, {
    username	: username,
		email			: username,
    role			: 'admin',
  }, function (err, user) {

		if (err) {
      console.log('Error creating user during bootstrap: ', err);
      return cb(err);
    }

		if (!user) {
			console.log('USER EXISTS!!');
			return;
		}

    Passport.create({
	      protocol : 'local',
				password : 'password',
				user     : user.id
    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          console.log('error', 'Error.Passport.Password.Invalid');
        }

        return user.destroy(function (destroyErr) {
          cb(destroyErr || err);
        });
      }

      cb(null, user);
    });
  });

};
