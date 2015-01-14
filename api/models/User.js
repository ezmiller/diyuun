/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'strict';
module.exports = {

    connection: 'mongodb',

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
    },

    beforeValidate: function(value, insert) {
        if ( Utilities.isEmpty( value ) ) {
          var InvalidArgumentException = new Exceptions.InvalidArgumentException('You must pass in some values to create a user.');
          // TODO: Log bad request to database
          delete InvalidArgumentException.stack;
          throw InvalidArgumentException;
        }
    }

};

