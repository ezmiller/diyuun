'use strict';
/**
 * Tests for UserController
 */

var request = require('supertest'),
    should = require('should'),
    moment = require('moment'),
    tmp = require('temporary'),
    crypto = require('crypto'),
    fs = require('graceful-fs'),
    Chance = require('chance');

var chance = new Chance();

describe("UserController Tests", function(done) {

	var server;
	var testUser = generateUser(true, true, true, true, true, true);
  var outputDir = new tmp.Dir();

  describe('try to get a user', function() {
  	
  	it('get server', function(done) {
			server = request.agent(sails.hooks.http.app);
			done();
		});

		it('register user', registerUser(testUser));

		it('get by username should return 200', function(done) {
			server
				.get('/user?username=' + testUser.username)
				.expect(200)
				.end(function(err, res) {
					var user = res.body;
					if (err) return done(err);
					user.password = testUser.password;
					testUser = user;
					return done();
				});
		});

		it('user object is valid', function(done) {
			testUser.should.have.properties([
				'id',
				'role',
				'email',
				'username',
				'firstName',
				'lastName',
				'title',
				'affiliation',
				'discipline',
				'discussions',
				'followedDiscussions',
				'likedComments',
				'avatar'
			]);
			testUser.should.not.have.properties(['passports']);
			done();
		});

  });

	describe('try to update a user avatar', function() {

		// Write nonsense bytes to a file fixture.
	  var EOF = '\x04';
	  var size = 1000;
	  var fileFixture = new tmp.File();
	  fileFixture.writeFileSync(crypto.pseudoRandomBytes(size) + EOF);
	  fileFixture.size = size;

		after(function() {
	    fileFixture.unlinkSync();
		});

		it('upload should return 200', function(done) {
			server
				.post('/user/avatar')
				.attach('avatar', fileFixture.path)
				.expect(200)
				.end(function(err,res) {
					if (err) return done(err);
					return done();
				});
		});

	});

	describe('try to set follow/unfollow discussion', function() {

		var testDiscussion;

		it('test user has an id', function(done) {
			testUser.id.should.not.be.null;
			done();
		});

		it('create discussion', function(done) {
			server
				.post('/discussions')
				.send(generateDiscussion(true,true,testUser.id))
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					testDiscussion = res.body;
					testDiscussion.id.should.not.be.undefined;
					done();
				});
		});

		it('follow should return 200', function(done) {
			var url = '/user/' + testUser.id + '/follow/discussion/' + testDiscussion.id;
			server.get(url).expect(200,done);
		});

		it('verify that follow was recorded', function(done) {
			server
				.get('/users/' + testUser.id)
				.end(function(err, res) {
					var user, valid;
					if (err) return done(err);
					user = res.body;
					valid = user.followedDiscussions.some(function(currDiss) {
						return currDiss.id == testDiscussion.id;
					});
					valid.should.be.true;
					done();
				});
		});

		it('create a second discussion', function(done) {
			server
				.post('/discussions')
				.send(generateDiscussion(true,true,testUser.id))
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					testDiscussion = res.body;
					testDiscussion.id.should.not.be.undefined;
					done();
				});
		});

		it('create a second discussion', function(done) {
			server
				.post('/discussions')
				.send(generateDiscussion(true,true,testUser.id))
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					testDiscussion = res.body;
					testDiscussion.id.should.not.be.undefined;
					done();
				});
		});

		it('follow second discussion should return 200', function(done) {
			var url = '/user/' + testUser.id + '/follow/discussion/' + testDiscussion.id;
			server.get(url).expect(200,done);
		});

		it('verify that both follows were recorded', function(done) {
			server
				.get('/users/' + testUser.id)
				.end(function(err, res) {
					var user, valid;
					if (err) return done(err);
					user = res.body;
					user.followedDiscussions.length.should.equal(2);
					valid = user.followedDiscussions.some(function(currDiss) {
						return currDiss.id == testDiscussion.id;
					});
					valid.should.be.true;
					done();
				});
		});

		it('unfollow second discusison should return 200', function(done) {
			var url = '/user/' + testUser.id + '/unfollow/discussion/' + testDiscussion.id;
			server.get(url).expect(200,done);
		});

		it('verify that unfollow worked', function(done) {
			server
				.get('/users/' + testUser.id)
				.end(function(err, res) {
					var user, valid;
					if (err) return done(err);
					user = res.body;
					valid = user.followedDiscussions.some(function(currDiss) {
						return currDiss.id == testDiscussion.id;
					});
					valid.should.be.false;
					done();
				});
		});


	});

	describe('Try to like/unlike a comment', function() {

		var tmpUserId;
		var tmpDiscussion;
		var testComment;

		before(function() {
			return Promise.resolve(
				User.create(generateUser(true, true, true, true, true, true))
			).then(function(newUser) {
				tmpUserId = newUser.id;
				return Promise.resolve(
					Discussion.create(generateDiscussion(true,true,tmpUserId, false, false))
				).then(function(newDiscussion) {
					tmpDiscussion = newDiscussion;
					return Comment.create(generateTestComment(tmpUserId, true, [tmpDiscussion.id]))
					.then(function(newComment) { testComment = newComment; })
					.catch(function(err) { throw err; });
				}).catch(function(err) { throw err; });
			}).catch(console.error);
		});

		it('should return 200', function(done) {
			server
			.get('/user/' + tmpUserId + '/like/comment/' + testComment.id)
			.expect(200,done);
		});

		it('like was recorded', function(done) {
			server
			.get('/users/' + tmpUserId)
			.end(function(err, res) {
				var user, valid;
				if (err) return done(err);
				user = res.body;
				user.likedComments.length.should.equal(1);
				valid = user.likedComments[0].id == testComment.id;
				valid.should.be.true;
				done();
			});
		});

		it('unlike shoud return 200', function(done) {
			server
			.get('/user/' + tmpUserId + '/unlike/comment/' + testComment.id)
			.expect(200,done);
		});

		it('unlike was recorded', function(done) {
			server
			.get('/users/' + testUser.id)
			.end(function(err, res) {
				var user, valid;
				if (err) return done(err);
				valid = res.body.likedComments.some(function(currComment) {
					return currComment.id == testComment.id;
				});
				valid.should.be.false;
				done();
			});
		});

	});

	// TODO: Write a test to validate avatar download.
	// Had trouble getting this working. See this stackoverflow:
	// https://stackoverflow.com/questions/32155688/how-do-i-write-a-test-for-a-binary-download-using-mocha-and-should-js-with-sails
	// 
	// describe('try to download a user avatar', function() {
	// 	var download;
	// 	it('should return 200', function(done) {
	// 		server
	// 			.get('/user/' + testUser.id + '/avatar')
	// 			.expect(200)
	// 			.end(function(err, res) {
	// 				if (err) return done(err);
	// 				download = new Buffer(res.text, 'ascii');
	// 				return done();
	// 			});
	// 		});
	// 	it('should return binary stream', function(done) {
	// 		var testAvatar = fs.readFileSync(fileFixture.path);
	// 		download.toString('base64').should.be.equal(testAvatar.toString('base64'));
	// 		done();	
	// 	});
	// });
	

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
  if (hasMembers) discussion.members = typeof hasMembers === 'string' ? hasMembers : null
  if (hasSources) discussion.sources = typeof hasSources === 'string' ? hasSources : null;
  discussion.isPrivate = isPrivate !== undefined ? isPrivate : true;
  discussion.isVisible = isVisible !== undefined ? isVisible : false;

  console.log({discussion:discussion});
  
  return discussion;
}

function generateTestComment(hasUser, hasText, hasDiscussions, hasAtReference) {
	var comment = {};

	comment.user = typeof hasUser === 'string' ? hasUser: null; 
	comment.discussions = hasDiscussions ? hasDiscussions : '';
	if (hasText) comment.text = (typeof hasText === 'string') ? hasText : chance.paragraph();

	return comment;
}
