/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
var Promise = require('promise');
module.exports = {

    connection: 'mongodb',

    attributes: {
        userName: {
            type: 'string',
            required: true,
            unique: true
        },
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
        password: {
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

    beforeValidate: function(values, next) {

        // Check for an empty user entry
        if ( Utilities.isEmpty( values ) ) {
          var InvalidArgumentException = new Exceptions.InvalidArgumentException('You must pass in some values to create a user.');
          // TODO: Log bad request to database
          delete InvalidArgumentException.stack;
          throw InvalidArgumentException;
        }

        next();

    },

    beforeCreate: function(values, next) {

        // Use promise to encrypt password
        bcryptAsyncHash(values.password)
        .then(function (encryptedPassword) {
            values.password = encryptedPassword;
            next();
        })
        .catch(function (err) {
            var FailedToPersistDataException = new Exceptions.FailedToPersistDataException('Failed to save password.');
            // TODO: Log failure to save password to database
            delete FailedToPersistDataException.stack;
            throw FailedToPersistDataException;
        });

    },

    afterCreate: function(user, next) {

        // delete the password so it's not exposed in response
        delete user.password;

        next();
    }

};

var bcryptAsyncHash = function(password) {
    
    return new Promise(function(resolve, reject) {
        require('bcrypt').hash(password, 8, function passwordEncrypted(err, encryptedPassword) {
            if ( err ) return reject( err );
            resolve( encryptedPassword );
        });
    });
};
