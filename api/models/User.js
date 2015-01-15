/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
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
            type: 'string'
        },
        institution: {
            type:'string'
        },
        emailAddress: {
            type: 'email',
            required: true,
            unique: true
        },
        bio: {
            type: 'text'
        },
        profilePicture: {
            type: 'string'
        },
        encryptedPassword: {
            type: 'string',
            required: true,
            unique: true
        },
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
            via: 'reviewer'
        }
    },

    beforeValidate: function(values, insert) {

        // Check for an empty user entry
        if ( Utilities.isEmpty( values ) ) {
          var InvalidArgumentException = new Exceptions.InvalidArgumentException('You must pass in some values to create a user.');
          // TODO: Log bad request to database
          delete InvalidArgumentException.stack;
          throw InvalidArgumentException;
        }

        if ( !values.password ) {
            var InvalidArgumentException = new Exceptions.InvalidArgumentException('You must provide a password when creating a user.');
            // TODO: Log bad request to database.
            delete InvalidArgumentException.stack;
            throw InvalidArgumentException;
        }

        // Try to save encrypted password
        require('bcrypt').hash(values.password, 8, function passwordEncrypted(err, encryptedPassword) {
            if ( err ) {
                var FailedToPersistDataException = new Exceptions.FailedToPersistDataException('Failed to save password.');
                // TODO: Log failure to save password to database
                delete FailedToPersistDataException.stack;
                throw FailedToPersistDataException;
            }
            delete values.password;
            values.encryptedPassword = encryptedPassword;
        });

        insert();

    }

};

