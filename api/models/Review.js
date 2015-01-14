/**
* Review.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';
module.exports = {

    connection: 'mongodb',

    attributes: {
        text: {
            type: 'string',
            required: true
        },
        book: {
            model: 'book',
            required: true
        },
        reviewer: {
            model: 'user',
            required: true
        },
        like: {
            collection: 'user',
            via: 'likedReviews'
        }
    }

};

