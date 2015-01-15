/**
 * ProfileController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res) {
		
		// Strip passwords from response
		User.find().then(function(users) {
			for (var index in users) {
				delete users[index].password;
			}
			res.json( users );
		});
	}

};