'use strict';
/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



	new: function(req, res) {
		console.log('BookController: "new" action called.');
		res.view();
	},

	create: function(req, res, next) {
		console.log('BookController: "create" action called.');

		var book = req.allParams();

		Book.create(book, function(err, book) {

			if (err) {
				sails.error(err);
				return res.redirect('/book/new');
			}

			// Send new book as response.
			res.json(book);

		});
	}

};

