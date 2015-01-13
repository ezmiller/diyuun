/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: 'string',
  	likedBooks: {
  		collection: 'book',
  		via: 'like'
  	},
  	likedReviews: {
  		collection: 'review',
  		via: 'like'
  	},
  	reviews: {
  		collection: 'review',
  		via: 'reviewer',
  		unique: true
  	}
  }

};

