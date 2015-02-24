'use strict';
/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	one: function(req, res) {
		res.view();
	},

	new: function(req, res) {
		console.log('BookController: "new" action called.');
		res.view();
	},

	create: function(req, res, next) {
		console.log('BookController: "create" action called.');

		var book = req.allParams();

		Book.create(book, function(err, book) {

			// Check for validation error.
			if (err && err.code === 'E_VALIDATION') {
				req.session.flash = {
					'err': err
				}
				return res.status(400).send({err: err});
			}

			// Send new book as response.
			res.json(book);

		});
	}

};

