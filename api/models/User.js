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
        avatar: {
            type: 'string'
        },
        avatarFd: {
            type: 'string'
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        recommendations: {
            collection: 'recommendation',
            via: 'user'
        },
        discussions: {
            collection: 'discussion',
            via: 'members'
        }
    },

    beforeCreate: function(user, next) {
        user.avatar = utils.getAvatar('gravatar', utils.MD5(user.email.toLowerCase()), 80);
        next();
    }

};