/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
  
  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {
    console.log('AuthController::logout');
    req.logout();
    res.ok();
  },

  /**
   * Returns the user id of the logged in user; otherwise, false.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   */
  authorized: function(req, res) {
    var user = (req.user) ? req.user : false
    res.json(user);
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {
    console.log('AuthController::callback() called.');

    function handleAuthErr (err) {
      var action = req.param('action')
          , flashError = req.flash('error')[0];

      // If there's a passport flash error send respond 401 response with that.
      if (flashError) {
        res.send(401, {error: flashError});  
      } 
      // If there's an AuthorizatoinError, send that.
      else if (err.name === 'AuthorizationError') {
        res.send(500, {error: err});
      } 
      else {
        res.negotiate(err);
      }
      
    }

    passport.callback(req, res, function (err, user) {
      if (err) {
        return handleAuthErr(err);
      }

      req.login(user, function (err) {
        if (err) {
          return handleAuthErr();
        }

        // Upon successful login, send the user to the homepage were req.user
        // will available.
        res.ok();
      });
    });

  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    passport.disconnect(req, res);
  }
};

module.exports = AuthController;
