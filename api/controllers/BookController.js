/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function(req, res) {
		res.view();
	},

	'create': function(req, res, next) {

		// Create a user with the parameters sent from the add form 
		// --> book/new.ejs
		Book.create( req.params.all(), function(err, book) {

			if (err) {
				req.session.flash = {
					'err': err
				}
				return res.redirect('/book/new');
			}

			// send new book as response
			res.json(book);
		});
	}

};

