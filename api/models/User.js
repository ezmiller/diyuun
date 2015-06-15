/**
* User.js
*
* @description :: This model represents a user.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
var Promise = require('promise');

module.exports = {

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
        role: {
            type: 'string',
            enum: ['user', 'editor', 'admin'],
            required: true
        },
        title: {
            type: 'string'
        },
        affiliation: {
            type:'string'
        },
        bio: {
            type: 'text'
        },
        discipline: {
            model: 'discipline',
        },
        interests: {
            type: 'array'
        },
        profilePicture: {
            type: 'string'
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        recommendations: {
            collection: 'recommendation',
            via: 'user'
        }
    },

};