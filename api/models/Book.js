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

	schema: true,

	types: {
		isValidISBN: function(isbn) {
			return validator.isISBN( isbn );
		}
	},

	attributes: {

		title: {
			type: 'string',
			required: true
		},

		ISBN: {
			type: 'string',
			isValidISBN: true,
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
	}

};

