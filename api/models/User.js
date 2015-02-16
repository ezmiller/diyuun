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

    schema: true,

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        firstName: {
            type: 'string',
            required: false
        },
        lastName: {
            type: 'string',
            required: false
        },
        title: {
            type: 'string'
        },
        institution: {
            type:'string'
        },
        bio: {
            type: 'text'
        },
        profilePicture: {
            type: 'string'
        },
        passports: {
            collection: 'Passport',
            via: 'user'
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

};