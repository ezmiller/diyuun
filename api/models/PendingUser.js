/**
* PendingUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	connection: 'mongodb',

  attributes: {
  	firstName: {
  		type: 'string',
  		required: true
  	},
  	lastName: {
  		type: 'string',
  		required: true
  	},
  	title: {
  		type: 'string',
  		// required: true
  	},
  	affiliation: {
  		type: 'string',
  		// required: true
  	},
    discipline: {
        type: 'json',
    },
    interests: {
        type: 'array'
    },
  }

};

