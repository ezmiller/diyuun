'use strict';
/**
 * Tests for PendingUserController
 */

var request = require('supertest'),
		should = require('should');

var token;

describe('PendingUserController', function(done) {

	describe('Try to create a pending user via /invite with no values', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/invite')
		    .send(generatePendingUser(false, false, false, false))
		    .expect(400, done);
		});
	});

	describe('Try to create a pending user via /invite with no name set', function() {
		it('should return 400', function(done) {
			request(sails.hooks.http.app)
		    .post('/invite')
		    .send(generatePendingUser(false, true, true, true))
		    .expect(400, done);
		});
	});

	describe('Try to create a pending user via /invite with an invalid name', function() {
		it('should return 400', function(done) {
			request(sails.hooks.http.app)
				.post('/invite')
				.send(generatePendingUser('Bobbie', true, true, true))
				.expect(400, done);
		});
	});

	describe('Try to create a pending user via /invite with no email set', function() {
		it('should return 400', function(done) {
			request(sails.hooks.http.app)
		    .post('/invite')
		    .send(generatePendingUser(true, false, true, true))
		    .expect(400, done);
		});
	});

	describe('Try to create a pending user with all values', function() {
		var result;
		it('should return 200', function(done) {
			request(sails.hooks.http.app)
				.post('/invite')
				.send(generatePendingUser(true,true,true,true))
				.expect(200)
		    .end(function(err,res) {
		    	result = res.body;
		    	done();
		    });
		})
		it('should return an object containing valid join link', function(done) {
			result.should.be.an.object;
			result.should.have.keys('joinLink');
			result.joinLink.should.match(/\/join\/.*/);

			// It was valid, so extract the user token for testing later.
			token = result.joinLink.match(/join\/(.*)/)[1];

			done();
		});
	});
	
	describe('Try to find a pending user via GET /pendingusers without a token', function(done) {
		it('should return 400', function(done) {
			request(sails.hooks.http.app)
				.get('/pendingusers')
				.expect(400, done);
		});
	});

	describe('Try to find a pending user via GET /pendingusers with a valid token', function(done) {
		var result;
		it('should return 200', function(done) {
			request(sails.hooks.http.app)
				.get('/pendingusers/'+token) // token extracted up above.
				.expect(200)
				.end(function(err,res) {
					result = res.body;
					done();
				})
		});
		it('should return an object containing valid pending user data', function(done) {
			result.should.be.an.object;
			result.should.have.properties('email', 'firstName', 'lastName');
			done();
		});
	});

	describe('Try to update pending user with invalid token via POST /pendinguser/:token', function(done) {
		var result,
				discipline = generatePendingUserDiscipline();
		it('should return 400', function(done) {
			request(sails.hooks.http.app)
				.post('/pendingusers/123546') // Invalid token!
				.send({'discipline': discipline})
				.expect(400, done);
		});
	});
	
	describe('Try to update pending user with new discipline via POST /pendinguser/:token', function(done) {
		var result,
				discipline = generatePendingUserDiscipline();
		it('should return 200', function(done) {
			request(sails.hooks.http.app)
				.post('/pendingusers/'+token)
				.send({'discipline': discipline})
				.expect(200)
				.end(function(err,res) {
					result = res.body;
					done();
				});
		});
		it('should not add the token to the pending user', function(done) {
			result.should.not.have.property('token');
			done();
		});
		it('should have updated the discipline', function(done) {
			result.discipline.should.eql(discipline);
			done();
		});
	});

	/** Save Action Tests */
	describe('Try to save pending user with an invalid token via /pendingusers/save/:token', function(done) {
		it('should return 500', function(done) {
			request(sails.hooks.http.app)
				.get('/pendingusers/save/12invalid45') // Invalid token!
				.expect(500,done);
		});
	});
	describe('Try to save existing pending user with valid token via /pendingusers/save/:token where no new user has been created ', function(done) {
		it('should return 500', function(done) {
			request(sails.hooks.http.app)
				.get('/pendingusers/save/'+token)
				.expect(500)
				.end(function(err,res) {
					if (!err) {
						done();
					} else { return done(err); }
				})
		});
	});
	describe('Try to save a pending user via /pendingusers/save/:token where new user stub is created first ', function(done) {
		var user,
				userStub = {
					'username': 'bobbie.brown@example.edu',
					'email': 'bobbie.brown@example.edu',
					'firstName': 'Bobbie',
					'lastName': 'Brown',
					'password': '2952fpij-023'
				};
		it('first create a new user stub', function(done) {
			request(sails.hooks.http.app)
			.post('/auth/local/register')
			.send(userStub)
			.end(function(err,res) {
				done();
			});
		});
		it('save should then return 200', function(done) {
			request(sails.hooks.http.app)
				.get('/pendingusers/save/'+token)
				.expect(200).
				end(function(err,res) {
					user = res.body;
					done();
				});
		});
		it('user object is valid', function(done) {
			user.should.be.an.object;
			user.should.have.properties([
					'id',
					'username',
					'firstName',
					'lastName',
					'email',
					'role',
					'title'
			]);
			user.role.should.equal('user');
			done();
		});
	});
});

function generatePendingUser(hasName, hasEmail, hasAffiliation, hasTitle) {
	var pendingUser = {};

	if (hasName) pendingUser.name = typeof hasName ==='string' ? hasName : 'Bobbie Brown';
	if (hasEmail) pendingUser.email = typeof hasName ==='string' ? hasEmail : 'bobbie.brown@example.edu';
	if (hasAffiliation) pendingUser.affiliation = typeof hasName ==='string' ? hasAffiliation : 'Very Exclusive University';
	if (hasTitle) pendingUser.title = typeof hasName ==='string' ? hasTitle : "Assistant Professor";

	return pendingUser;
}

function generatePendingUserDiscipline() {
	var rand = Math.floor(Math.random() * 5),
	 		a = [ 'dynamic networks', 'space odyssey', 'cake making', 'science', 'dog walking' ];
	return a[rand];
}