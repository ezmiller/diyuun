/**
 * Tests for DiscussionController
 */
/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false, sails: false */
(function() {
  'use strict';

  var request = require('supertest'),
  		should = require('should'),
      chance = require('chance').Chance();

  describe('DiscussionController Tests', function(done) {
    var testUser, testDiscipline, testDiscussion;

  	testUser = {
      'username': 'bobbie.brown@example.edu',
      'email': 'bobbie.brown@example.edu',
      'firstName': 'Bobbie',
      'lastName': 'Brown',
      'password': '2952fpij-023',
      'role': 'user',
    };

    testDiscipline = {
      name: 'intellectual history'
    };

    testDiscussion = {
      owner: '',
      members: '',
      comments: '',
      private: '',
      visible: '',
      title: '',
      prompt:''
    };

    before(function() {
      return Promise
        .all([User.destroy(), Source.destroy(), Discipline.destroy()])
        .then(function () {

          return Discipline.create(testDiscipline)
            .then(function(result) {
              return result;
            })
            .catch(function(err) { throw err; });

        })
        .then(function(discipline) {

          testUser.discipline = discipline.id;

          return User.create(testUser)
            .then(function(result) {
              testUser = result;
              return result;
            })
            .catch(function(err) { throw err; });

        }).catch(function(err) {
          console.log('Error creating fake data for recommendation tests: ', err.message);
        });
    });

    after(function() {
      return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy(), Recommendation.destroy()]);
    });

    describe('try to create a discussion without an owner', function() {
      it('should return 400', function(done) {
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(400,done);
      });
    });

    describe('try to create a discussion with one owner', function() {

      it('should return 200', function(done) {
        testDiscussion.owner = testUser.id;
        testDiscussion.title = chance.sentence({words: 4});
        testDiscussion.prompt = chance.sentence({words: 5});
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(200,done);
      });

    });

  });

}());

