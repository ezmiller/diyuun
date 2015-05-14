'use strict';
/**
 * Tests for SourceController
 */

var request = require('supertest'),
		should = require('should'),
		_ = require('underscore');

describe('SourceController Tests', function(done) {

	describe('Try to search for a book', function() {
		var result;
		it('should return 200', function(done) {
			request(sails.hooks.http.app)
	    .get('/sources/search/book?title=Age+of+fracture')
	    .expect(200)
	    .end(function(err, res) {
	    	if (err) done(err);
	    	result = res.body;
	    	done();
	    });
		});
		it('should return an array of source objects', function(done) {
			result.should.be.array;
			_.each(result, function(v,k) {
				v.should.be.object;
				v.should.have.properties([
					'type',
					'title',
					'authors',
					'language',
					'imageLinks',
					'googleSelfLink',
					'categories'
				]);
			});
			done();
		});
	});

});