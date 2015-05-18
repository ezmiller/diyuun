'use strict';


var Sails = require('sails'),
    Promise = require('promise'),
    sails;

before(function(done) {
  
  console.log('Setting the environment to testing and lifting sails...\n\n');
  process.env.NODE_ENV = 'testing';

  Sails.lift({
    log: {
        level: 'error'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    done(err, sails);
  });
  
});

after(function(done) {

  // Clean up data from tests.
  Promise.all([
    PendingUser.destroy(),
    User.destroy(),
    Source.destroy(),
    Author.destroy(),
    Recommendation.destroy(),
    Discipline.destroy()
  ])
  .catch(function(err) {
    console.log(err);
  })
  .done(function() {
    sails.lower(done);
  });

});