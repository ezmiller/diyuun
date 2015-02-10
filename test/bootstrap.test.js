'use strict';
var Sails = require('sails'),
  sails;
var Promise = require('promise');

before(function(done) {
  Sails.lift({
    log: {
        level: 'error'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {

  // clean up data from tests
  Promise.all([User.destroy(), Book.destroy(), Review.destroy(), Comment.destroy()])
  .then()
  .catch(function(err) {
    console.log(err);
  })
  .done(function() {
    sails.lower(done);
  });

});