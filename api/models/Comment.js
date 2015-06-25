/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	user: {
  		model: 'user',
  		required: true
  	},
  	text: {
  		type: 'string',
  		required: true
  	},
  	discussions: {
  		collection: 'discussion',
  		via: 'comments',
  		required: true
  	},
  	sources: {
  		collection: 'source',
  		via: 'comments'
  	}

  }
};

