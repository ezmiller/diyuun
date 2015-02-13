/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `AuthController.login()`
   */
  login: function (req, res) {
    res.view();
    // return res.json({
    //   todo: 'login() is not implemented yet!'
    // });
  },


  /**
   * `AuthController.process()`
   */
  process: function (req, res) {
    return res.json({
      todo: 'process() is not implemented yet!'
    });
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    return res.json({
      todo: 'logout() is not implemented yet!'
    });
  }

};

