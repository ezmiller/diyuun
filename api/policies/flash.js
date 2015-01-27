/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Provides a flash object containing error messages sent from api
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	// Clear flash in response object
	res.locals.flash = {};

	// If no error, pass control on.
	if ( ! req.session.flash ) return next();

	res.locals.flash = _.clone( req.session.flash );

	// Clear flash in request 
	req.session.flash = {};

	next();

}