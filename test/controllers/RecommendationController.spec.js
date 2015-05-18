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
    'role': 'user'
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
    return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy()]);
  });

  after(function() {
    return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy(), Recommendation.destroy()]);
  });

  describe('Try to create a new recommendation', function() {
    it('create test user', function(done) {
      request(sails.hooks.http.app)
      .post('/auth/local/register')
      .send(testUser)
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        testUser = res.body;
        done();
      });
    });
    it('create a test discipline', function(done) {
      request(sails.hooks.http.app)
      .post('/disciplines')
      .send(testDiscipline)
      .expect(200)
      .end(function(err, res) {
        if (err || res.error === 'E_VALIDATION') return done(err);
        testDiscipline = res.body;
        done();
      });
    });
    it('should return 200', function(done) {
      testRecommendation.source = testSource;
      testRecommendation.user = testUser;
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

});