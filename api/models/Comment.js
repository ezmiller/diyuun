'use strict';
/**
* Comment.js
*
* @description :: Represents a discussion.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	connection: 'mongodb',

	attributes: {

		user: {
			model: 'user',
			// required: true
		},

		book: {
			model: 'book',
			// required: true
		},

		text: {
			type: 'string',
			// required: true
		}

	}

};