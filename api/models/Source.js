'use strict';
/**
* Source.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

  attributes: {

  	type: {
  		type: 'string',
  		enum: [
  			'book', 
  			'journal article', 
  			'newspaper article', 
  			'blog post', 
  			'video'
  		],
  		required: true
  	},

  	title: {
  		type: 'string',
  		required: true
  	},

  	authors: {
  		collection: 'author',
  		via: 'works',
  		dominant: true
  	},

		editor: {
			type: 'string'
		},

		translator: {
			type: 'string'
		},

		year: {
			type: 'integer',
			required: true
		}

  }
};

