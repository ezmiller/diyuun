/**
* Recommendation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    source: {
      model: 'source'
    },

    user: {
      model: 'user'
    },

    discipline: {
      model: 'discipline'
    },

    rating: {
      type: 'integer',
      required: true
    },

    text: {
      type: 'string'
    }

  }

};

