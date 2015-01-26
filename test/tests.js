'use strict';
var request = require('supertest');
var should = require('should');

var user = {};
var book = {};
var review = {};
var mytest = 'test';

describe('Register User', function(done) {

	describe('try to create user with no values', function(){
		it('should return 500', function (done) {
		  request(sails.hooks.http.app)
		    .post('/user')
		    .send()
		    .expect(500, done);
		});
	});

	describe('try to create user without username', function() {
		it('should return 400', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(false, true, true, true, true) )
			.expect(400, done);
		});
	});

	describe('try to create user without first name', function() {
		it('should return 400', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(true, false, true, true, true) )
			.expect(400, done);
		});
	});

	describe('try to create user without last name', function() {
		it('should return 400', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(true, true, false, true, true) )
			.expect(400, done);
		});
	});

	describe('try to create user without email', function() {
		it('should return 400', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(true, true, true, false, true) )
			.expect(400, done);
		});
	});

	describe('try to create user without password', function() {
		it('should return 400', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(true, true, true, true, false) )
			.expect(400, done);
		});
	});

	describe('try to create user', function() {
		it('should return 200', function (done) {
			request(sails.hooks.http.app)
			.post('/user')
			.send( generateUser(true, true, true, true, true) )
			.expect(200)
			.end(function(err, res) {
				user = res.body;
		    	done();
		    });
		});
		it('user data from get request should match user data returned by create action', function (done) {
			request(sails.hooks.http.app)
			.get('/user?id='+user.id)
			.expect(200, function (err,res) {
				var dbUser = res.body[0];
				(dbUser.firstName).should.eql(user.firstName);
				(dbUser.lastName).should.eql(user.lastName);
				(dbUser.emailAddress).should.eql(user.emailAddress);
				done();
			});
		});
		it('user data from get request should not include password', function (done) {
			request(sails.hooks.http.app)
			.get('/user?id='+user.id)
			.expect(200, function(err,res) {
				var dbUser = res.body[0];
				(dbUser.password === undefined).should.be.true;
				done();
			})
		});
	});

	// TODO: try to create a user that already exists
	// TODO: test login with created user

})

describe('Create Book', function(done) {

	describe('try to create book with no values', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/book')
		    .send()
		    .expect(400, done);
		});
	});

	describe('try to create book with ISBN but without a title', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/book')
		    .send( generateBook(false, true) )
		    .expect(400, done);
		});
	});

	describe('try to create book with a title but without ISBN', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/book')
		    .send( generateBook(true, false) )
		    .expect(400, done);
		});
	});

	describe('try to create a book', function(){
		it('should return 200', function (done) {
		  request(sails.hooks.http.app)
		    .post('/book')
		    .send( generateBook(true, false) )
		    .expect(200)
		    .end(function(err,res) {
		    	book = res.body;
		    	done();
		    });
		});
	});

})

describe('Create Review', function(done) {
	//this.timeout(3000);

	describe('try to create review with no values', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/review')
		    .send()
		    .expect(400, done);
		});
	});

	describe('try to create review with a text but no reviewer or book', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/review')
		    .send( generateReview(true, false, false) )
		    .expect(400, done);
		});
	});

	describe('try to create review with a text and reviewer but no book', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/review')
		    .send( generateReview(true, false, book.id) )
		    .expect(400, done);
		});
	});

	describe('try to create review with a text and book but no reviewer', function(){
		it('should return 400', function (done) {
		  request(sails.hooks.http.app)
		    .post('/review')
		    .send( generateReview(true, user.id, false) )
		    .expect(400, done);
		});
	});

	describe('try to create review', function(){
		it('should return 200', function (done) {
		  request(sails.hooks.http.app)
		    .post('/review')
		    .send( generateReview(true, user.id, book.id) )
		    .expect(200)
		    .end(function(err,res) {
		    	review = res.body;
		    	done();
		    });
		});
	});

});

function generateUser(hasUserName, hasFName, hasLName, hasEmail, hasPassword) {

	var user = {};

	if ( hasFName ) user.firstName = 'Bobbie';
	if ( hasLName ) user.lastName = 'Brown';
	if ( hasEmail ) user.emailAddress = 'bobbie.brown@sky.net';
	if ( hasPassword ) user.password = 'roughinitup';
	if ( hasUserName ) user.username = user.emailAddress;

	return user;
}

function generateBook(hasTitle, hasISBN) {

	var book = {};

	if ( hasTitle ) book.title = "Occidentalism";
	if ( hasISBN ) book.ISBN = '0143034871';

	return book;
}

function generateReview(hasText, hasReviewer, hasBook) {

	var review = {};

	if ( hasText ) review.text = "This is a very short review";
	if ( hasReviewer ) review.reviewer = hasReviewer;
	if ( hasBook ) review.book = hasBook;

	return review;
}