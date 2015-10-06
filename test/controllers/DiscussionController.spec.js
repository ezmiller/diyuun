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
    var server, testUser, testDiscipline, testDiscussion, testComment;

  	testUser = generateUser(true, true, true, true, true, true);

    testDiscipline = {
      name: 'intellectual history'
    };

    var testSource = generateSource(true, true, true, true, true, false);

    before(function() {
      return Promise
        .all([User.destroy(), Source.destroy(), Discipline.destroy(), Discussion.destroy()])
        .then(function () {

          return Discipline.create(testDiscipline)
            .then(function(result) {
              return result;
            })
            .catch(function(err) { throw err; });

        })
        .then(function() {

          return Source.create(testSource)
            .then(function(result) {
              testSource = result;
              return result;
            }).catch(function(err) { throw err; });

        }).catch(function(err) {
          console.log('Error creating fake data for recommendation tests: ', err);
        });
    });

    after(function() {
      return Promise.all([User.destroy(), Source.destroy(), Discipline.destroy(), Recommendation.destroy()]);
    });

    describe('try to setup the server', function() {
      it('server is set', function(done) {
        server = request.agent(sails.hooks.http.app);
        server.should.not.equal('undefined');
        done();
      });
    });

    describe('try setup test user', function() {
      
      after(function() {
        User.findOne({username: testUser.username})
          .then(function(found) {
            testUser = found;
          }).catch(console.log);
      });

      it('register the user', registerUser(testUser));
    });

    describe('try to create an empty discussion', function() {
      it('should return 400', function(done) {
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(400,done);
      });
    });

    describe('try to create a discussion with one owner', function() {
      it('should return 200', function(done) {
        testDiscussion = generateDiscussion(true, true, testUser.id, false, false);
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(200,done);
      });
    });

    describe('try to create a discussion with source in db', function() {
      it('should return 200', function(done) {
        testDiscussion = generateDiscussion(true, true, testUser.id, false, [testSource]);
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(200)
          .end(function(err,res) {
            if (err) return done(err);
            done();
          })
      });
    });

    describe('try to create a discussion with source from web', function() {
      it('should return 200', function(done) {
        var testSource2 = generateSource(true,true,true,true,true,true);
        testDiscussion = generateDiscussion(true, true, testUser.id, false, [testSource, testSource2]);
        request(sails.hooks.http.app)
          .post('/discussions')
          .send(testDiscussion)
          .expect(200)
          .end(function(err,res) {
            if (err) return done(err);
            testDiscussion = res.body;
            return done();
          })
      });
    });

    describe('try to retrieve the discussion via /discussion/:discussionId', function(done) {
      var result;
      it('should return 200', function(done) {
        server
          .get('/discussions/' + testDiscussion.id)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            result = res.body;
            return done();
          });
      });
      it('discussion is valid', function(done) {
        result.should.not.be.empty;
        result.should.have.properties([
          'owner',
          'title',
          'prompt',
          'isPrivate',
          'isVisible',
          'sources',
          'comments',
          'updatedAt',
        ]);
        done();
      });
    });

    describe('try to validate a discussion with a comment', function() {
      before(function() {
        Comment.create(generateTestComment(testUser.id,true,[testDiscussion.id]))
        .then(function(comment) {
          testComment = comment;
          return comment;
        })
        .then(function(comment) {
          Discussion.update({comments: [comment.id]}).catch(console.log);
        })
        .catch(console.log);
      });
      it('should be valid', function(done) {
        server
        .get('/discussions/' + testDiscussion.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var result = res.body;
          result.should.not.be.empty;
          result.should.have.properties([
            'owner',
            'title',
            'prompt',
            'isPrivate',
            'isVisible',
            'sources',
            'comments',
            'updatedAt',
          ]);
          result.comments[0].should.not.be.empty;
          result.comments[0].should.have.properties(['id', 'user', 'text', 'likes', 'sources']);
          result.comments[0].user.should.be.object;
          return done();
        });
      });
    });

    describe('try to validate a discussion with a liked comment', function() {
      it('like the comment', function(done) {
        console.log('/user/' + testUser.id + '/like/comment/' + testComment.id);
        server
        .get('/user/' + testUser.id + '/like/comment/' + testComment.id)
        .expect(200,done);
      });
      it('comment property should contain like', function(done) {
        server
        .get('/discussions/' + testDiscussion.id)
        .expect(200)
        .end(function(err, res) {
          var result;
          if (err) return done(err);
          result = res.body;
          console.log({result:result.comments});
          result.should.not.be.empty;
          result.comments[0].should.not.be.empty;
          result.comments[0].should.have.properties([
            'id',
            'user',
            'text',
            'discussions',
            'sources',
            'likes'
          ]);
          return done();
        });
      });
    });

    function registerUser(user) {
      return function(done) {
        server
          .post('/auth/local/register')
          .send(user)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      }
    }

    function loginUser(user) {
      return function(done) {
        server
          .post('/auth/local')
          .send({'identifier': user.email, 'password': user.password})
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          })
      }
    }

  });

  function generateUser(hasUsername, hasEmail, hasFirstName, hasLastName, hasPassword, hasRole, hasAvatar) {
    var user = {};

    if (hasUsername) user.username = typeof hasUsername === 'string' ? hasUsername : chance.email();
    if (hasEmail) user.email = typeof hasEmail === 'string' ? hasEmail : chance.email();
    if (hasFirstName) user.firstName = typeof hasFirstName === 'string' ? hasFirstName : chance.first();
    if (hasLastName) user.lastName = typeof hasLastName === 'string' ? hasLastName : chance.last();
    if (hasPassword) user.password = typeof hasPassword === 'string' ? hasPassword : chance.hash({length:15});
    if (hasRole) user.role = typeof hasRole === 'string' ? hasRole : 'user';
    if (hasAvatar) user.avatar = typeof hasAvatar === 'string' ? hasAvatar : sails.getBaseUrl() + '/images/avatar.svg';

    return user;
  }

  function generateDiscussion(hasTitle, hasPrompt, hasOwner, hasMembers, hasSources, isPrivate, isVisible) {
     var discussion = {};

    if (hasTitle) discussion.title = typeof hasTitle === 'string' ? hasTitle : chance.sentence({words: 4});
    if (hasPrompt) discussion.prompt = typeof hasPrompt === 'string' ? hasPrompt : chance.sentence({words:10});
    if (hasOwner) discussion.owner = hasOwner; // This can't be autogenerated
    if (hasMembers) discussion.members = hasMembers; // Also can't be autogenerated
    if (hasSources) discussion.sources = hasSources; // Again, can't be autogenerated
    discussion.isPrivate = isPrivate !== undefined ? isPrivate : true;
    discussion.isVisible = isVisible !== undefined ? isVisible : false;
    
    return discussion;
  }

  function generateSource(hasType, hasIdentifiers, hasTitle, hasAuthors, hasYear, isWebSource) {
    var source;

    source = {};

    if (hasType) source.type = typeof hasType === 'string' ? hasType : 'book';
    if (hasIdentifiers) source.identifiers = typeof hasIdentifiers === 'array' ? hasIdentifiers : [ {type: 'ISBN_13', identifier: '9780571310302'} ];
    if (hasTitle) source.title = typeof hasTitle === 'string' ? hasTitle : chance.sentence({words: 3});
    if (hasAuthors) source.authors = typeof hasAuthors === 'object' ? hasAuthors : [{ firstName: chance.first(), lastName: chance.last() }];
    if (hasYear) source.year = typeof hasYear === 'int' ? hasYear : chance.year();
    if (isWebSource) source.websource = typeof isWebSource === 'string' ? isWebSource : 'google_books';

    return source;
  }

  function generateTestComment(hasUser, hasText, hasDiscussions, hasAtReference) {
    var comment = {};

    comment.user = typeof hasUser === 'string' ? hasUser: null; 
    comment.discussions = hasDiscussions ? hasDiscussions : '';
    if (hasText) comment.text = (typeof hasText === 'string') ? hasText : chance.paragraph();

    return comment;
  }

}());



