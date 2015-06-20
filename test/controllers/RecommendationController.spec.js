'use strict';
/**
 * Tests for RecommendationController
 */

var request = require('supertest'),
    should = require('should');

describe("RecommendationController Tests", function(done) {

  var testUser = {
    'username': 'bobbie.brown@example.edu',
    'email': 'bobbie.brown@example.edu',
    'firstName': 'Bobbie',
    'lastName': 'Brown',
    'password': '2952fpij-023',
    'role': 'user',
  };

  var testSource = {
    'type': 'book',
    'title': 'Geek Sublime',
    'subtitle': 'Writing Fiction, Coding Software',
    'authors': [{'firstName': 'Nancy', 'lastName': 'Fraser'}],
    'year': 2010
  };

  var testDiscipline = {
    name: 'science fiction'
  };

  var testRecommendation = {
    'text': 'It is just a great book.',
    'rating': 8
  };

  before(function() {
    return Promise
      .all([User.destroy(), Source.destroy(), Discipline.destroy()])
      .then(function () {

        return Discipline.create(testDiscipline)
          .then(function(result) {
            return result;
          })
          .catch(function(err) { throw err });

      })
      .then(function(discipline) {

        testUser.discipline = discipline.id;

        return User.create(testUser)
          .then(function(result) {
            return testUser = result;
          })
          .catch(function(err) { throw err });

      }).catch(function(err) {
        console.log('Error creating fake data for recommendation tests: ', err.message)
      });
  });

  after(function() {
    return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy(), Recommendation.destroy()]);
  });

  describe('Try to create a new recommendation', function() {
    it('should return 200', function(done) {
      testRecommendation.source = testSource;
      testRecommendation.user = testUser.id;
      request(sails.hooks.http.app)
      .post('/recommendations')
      .send(testRecommendation)
      .expect(200)
      .end(function(err,res) {
        if (err || res.body.error === 'E_VALIDATION') return done(err || res.body);
        testRecommendation = res.body;
        done();
      });
    });
    it('should return a valid recommendations model', function(done) {
      testRecommendation.should.have.properties([
        'source',
        'user',
        'rating'
      ]);
      testRecommendation.should.be.integer;
      done();
    });
  });

  describe('try to fetch the recommendations for the test user', function() {
    var result;
    it('get the test user id', function(done) {
      request(sails.hooks.http.app)
      .get('/users?username='+testUser.username)
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        testUser.id = res.body[0].id;
        done();
      });
    });
    it('should return 200', function(done) {
      console.log('testUser before get: ', testUser);
      request(sails.hooks.http.app)
      .get('/recommendations?user='+testUser.id)
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        result = res.body;
        done();
      });
    });
  });

  describe('try to fetch recommendations for a user that does not exist', function() {
    it('should return 400', function(done) {
      request(sails.hooks.http.app)
      .get('/recommendations?user=482ASDF803KLKJSFD2')
      .expect(400,done);
    });
  });

});