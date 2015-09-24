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
  	},
    likes: {
      collection: 'user',
      via: 'likedComments'
    }

  },

  afterUpdate: function(comment, next) {

    // When there is a comment update, the related discussions updatedAt timestamp should be changed.
    comment.discussions.map(function(discussion) {

      Discussion
      .update(discussion.id, {updatedAt: new Date()})
      .catch(function(err) {
        sails.log.error(new CustomErrors.PersistenceError('Failed to update discussion updatedAt property after updating comment.'));
      })

    });

    next();
  }

};

