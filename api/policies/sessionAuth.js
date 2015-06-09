/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
	console.log('policies::sessionAuth: session: ', req.session);

  if (req.user) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  console.log('policies:sessionAuth: user not authenticated');
  // return res.forbidden('You are not permitted to perform this action.');
  res.redirect('/login');
};
