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

		it('should return 200', function(done) {
			server
				.get('/users?username=' + testUser.username)
				.expect(200)
				.end(function(err, res) {
					var user = res.body[0];
					if (err) return done(err);
					user.password = testUser.password;
					testUser = user;
					return done();
				});
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

	describe('try to download a user avatar', function() {
		var result;
		it('should return 200', function(done) {
			server
				.get('/user/' + testUser.id + '/avatar')
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					result = res.body;
					return done();
				});
			}
		}
		// TODO: Write additional test to check that it is returning a binary data stream.
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
