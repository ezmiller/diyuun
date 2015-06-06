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

    identifiers: {
      type: 'array',
      required: true
    },

  	title: {
  		type: 'string',
  		required: true
  	},

    subtitle: {
      type: 'string'
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

    publisher: {
      type: 'string'
    },

    year: {
      type: 'integer',
      required: true
    },

    language: {
      type:'string'
    },

    abstract: {
      type:'string'
    },

    categories: {
      type: 'array'
    },

    imageLinks: {
      type: 'object'
    },

    recommendations: {
      collection: 'recommendation',
      via: 'source'
    }

  }
};

