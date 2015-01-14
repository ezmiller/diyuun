'use strict';
var request = require('supertest');

var user = {};
var book = {};
var review = {};

describe('Register User', function(done) {
	//this.timeout(3000);

	describe('try to create user with no values', function(){
		it('should return 500', function (done) {
		  request(sails.hooks.http.app)
		    .post('/user')
		    .send()
		    .expect(500, done);
		});
	});

	describe('try to create user', function(){
		it('should return 200', function (done) {

			var user = generateUser(true);

		  request(sails.hooks.http.app)
		    .post('/user')
		    .send( user )
		    .expect(200)
		    .end(function(err, res) {
		    	user = res.body;
		    	done();
		    });
		});
	});


})

describe('Create Book', function(done) {
	//this.timeout(3000);

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

'use strict';
var request = require('supertest');

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

})

function generateUser(isValid) {

	var user = {};

	if ( isValid) {
		user.name = "Bobbie Brown";
	}

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






