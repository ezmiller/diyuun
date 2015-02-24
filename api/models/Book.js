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

		author: {
			type: 'string',
			required: true
		},

		editor: {
			type: 'string'
		},

		translator: {
			type: 'string'
		},

		// publisher_info: {
		// 	type: 'json',
		// 	pub_info_complete
		// },

		// subjects: {
		// 	type: 'string'
		// },

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
		},

		discussion: {
			collection: 'comment',
			via: 'book'
		}
	}

};

