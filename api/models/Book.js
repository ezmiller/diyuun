/**
* Book.js
*
* @description :: Represents a book.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
var validator = require('validator');

module.exports = {

	connection: 'mongodb',

	attributes: {
		title: {
			type: 'string',
			required: true
		},
		ISBN: {
			type: 'string',
			unique: true,
			required: true
		},
		blurb: 'text',
		image: 'string',
		like: {
			collection: 'user',
			via: 'likedBooks'
		},
		reviews: {
			collection: 'review',
			via: 'book'
		}
	},

	beforeCreate: function(value, insert) {

		if ( validator.isISBN( value.ISBN ) ) {
			insert();
		} else {
			var ISBNError = new Exceptions.ISBNError('ISBN invalid.');
			// TODO: Log bad request to database
			delete ISBNError.stack;
			throw ISBNError;
		}
	}

};

