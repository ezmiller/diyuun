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
    followers: {
      collection: 'user',
      via: 'followedDiscussions'
    },
  	comments: {
  		collection: 'comment',
  		via: 'discussions'
  	},
    sources: {
      collection: 'source',
      via: 'discussions'
    },
    isPrivate: {
      type: 'boolean',
      required: true
    },
    isVisible: {
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
    },
    updatedAt: {
      type: 'datetime',
      defaultsTo: function() { return new Date(); },
      required: true
    }
  }
};

