/**
* User.js
*
* @description :: This model represents a user.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
var Promise = require('promise');

module.exports = {

    connection: 'mongodb',

    attributes: {
        username: {
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
        },
        comments: {
            collection: 'comment',
            via: 'user'
        }
    },

    beforeCreate: function(values, next) {

        // Use promise to encrypt password
        bcryptAsyncHash(values.password)
        .then(function (encryptedPassword) {
            console.log('encrypted: ', encryptedPassword);
            values.password = encryptedPassword;
            next();
        })
        .catch(function (err) {
            // var FailedToPersistDataError = new CustomErrors.FailedToPersistDataError('Failed to save password.');
            // delete FailedToPersistDataError.stack;
            // throw FailedToPersistDataError;
            sails.log.error(err);
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
