/**
* Review.js
*
* @description :: Represents a review.
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

