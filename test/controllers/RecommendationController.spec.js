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
    return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy()]);
  });

  after(function() {
    // return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy(), Recommendation.destroy()]);
  });

  describe('Try to create a new recommendation', function() {
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
    it('create test user', function(done) {
      testUser.discipline = { id: testDiscipline.id };
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

  describe('try to fetch recommendations for the test user', function() {
    var result;
    it('should return 200', function(done) {
      request(sails.hooks.http.app)
      .get('/recommendations?user='+testUser.id)
      .expect(200)
      .end(function(err,res) {
        if (err) return done(err);
        result = res.body;
        console.log(result);
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