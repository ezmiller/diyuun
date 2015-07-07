/**
 * Tests for CommentController
 */
/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false, sails: false */
(function() {
  'use strict';

  var request = require('supertest'),
  		should = require('should'),
      chance = require('chance').Chance();

  describe('CommentController Tests', function(done) {
  	var email, testUser, testDiscipline, testDiscussion, testComment;

  	email = chance.email(); 

  	testUser = {
      'username': email,
      'email': email,
      'firstName': chance.first(),
      'lastName': chance.last(),
      'password': chance.string(),
      'role': 'user',
    };

    testDiscipline = {
      name: chance.word()
    };

    testDiscussion = {
      owner: '',
      title: chance.sentence({words: 3}),
      prompt:chance.sentence({words: 4}),
      private: true,
      visible: false
    };

    before(function() {
      return Promise
        .all([User.destroy(), Discipline.destroy(), Discussion.destroy()])
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

        })
        .then(function(user) {

        	testDiscussion.owner = user.id;

        	return Discussion.create(testDiscussion)
        		.then(function(result) {
        			testDiscussion = result;
        			return result;
        		})
        		.catch(function(err) { throw err; });

        }).catch(function(err) {
          console.error('Error creating fake data for comment controller tests: ', err);
        });
    });

    after(function() {
      return Promise.all([
      	User.destroy(),
      	Discipline.destroy(), 
      	Discussion.destroy(),
      	Comment.destroy()
      ]);
    });

    describe('try to create an empty comment', function() {
    	it('should return 400', function(done) {
    		request(sails.hooks.http.app)
          .post('/comments')
          .send(generateTestComment(false, false, false))
          .expect(400,done);
    	});
    });

    describe('try to create a comment without user', function() {
    	it('should return 400', function(done) {
    		request(sails.hooks.http.app)
          .post('/comments')
          .send(generateTestComment(false, true, [testDiscussion.id]))
          .expect(400,done);
    	});
    });

    describe('try to create a comment without discussion', function() {
    	it('should return 400', function(done) {
    		request(sails.hooks.http.app)
          .post('/comments')
          .send(generateTestComment(true, true, false))
          .expect(400,done);
    	});
    });

    describe('try to create a valid comment', function() {
    	it('should return 200', function(done) {
    		console.log({testDiscussion:testDiscussion});
    		request(sails.hooks.http.app)
          .post('/comments')
          .send(generateTestComment(true, true, [testDiscussion.id]))
          .expect(200)
          .end(function(err,res) {
          	console.log(res.body);
          	done(err);
          });
    	});
    });

  });

	function generateTestComment(hasUser, hasText, hasDiscussions) {
		var comment = {};

		comment.user = hasUser ? hasUser : '';
		comment.discussions = hasDiscussions ? hasDiscussions : '';
		if (hasText) comment.text = (typeof hasText === 'string') ? hasText : chance.paragraph();

		return comment;
	}

}());