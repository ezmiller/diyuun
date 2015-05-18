/**
* Disciplines.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    'name': {
      type: 'string',
      unique: true,
      required: true,
      lowercase: true
    },
    'users': {
      collection: 'user',
      via: 'discipline'
    },
    recommendations: {
      collection: 'recommendation',
      via: 'discipline'
    },
    relatedTo: {
      collection: 'discipline',
      via: 'relatedFrom',
      dominant: true
    }, 
    relatedFrom: {
      collection: 'discipline',
      via: 'relatedTo'
    }
  }

};