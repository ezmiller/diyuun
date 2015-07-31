/**
* Discussion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owner: {
  		model: 'user',
      required: true
  	},
    members: {
      collection: 'user',
      via: 'discussions'
    },
  	comments: {
  		collection: 'comment',
  		via: 'discussions'
  	},
    sources: {
      collection: 'source',
      via: 'discussions'
    },
    private: {
      type: 'boolean',
      required: true
    },
    visible: {
      type: 'boolean',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    prompt: {
      type: 'string',
      required: true
    }
  }
};

