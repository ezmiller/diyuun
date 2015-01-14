/**
* Review.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'strict';
module.exports = {

    connection: 'mongodb',
    attributes: {
        text: 'text',
        book: {
            model: 'book'
    },
    reviewer: {
            model: 'user'
        },
        like: {
            collection: 'user',
            via: 'likedReviews'
        }
    }

};

