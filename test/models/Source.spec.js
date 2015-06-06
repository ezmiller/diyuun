'use strict';
/**
 * Tests for Source Model
 */

var should = require('should');

describe('Source Model', function() {

	describe('Try to create a new book source with one author', function() {
		var testBook = generateBook(true, true, true, true);
		it('should create a valid source', function(done) {
			Source.create(testBook, function(err, book) {
				if (err) {
					done(err);
					return;
				}
				book.title.should.equal(testBook.title);
				book.year.should.equal(testBook.year);
				done();
			});
		});
		it('should associate a valid author',function(done) {
			Source.findOne({where: {title: testBook.title}}).populate('authors')
				.exec(function(err, found) {
					if(err) {
						done(err);
						return;
					}
					found.authors[0].firstName.should.equal(testBook.authors[0].firstName);
					found.authors[0].lastName.should.equal(testBook.authors[0].lastName);
					done();
				});
		});
	});

});

function generateBook(hasIdentifiers, hasTitle, hasAuthors, hasYear) {
	var book = {'type': 'book'};

	if (hasIdentifiers) book.identifiers = typeof hasIdentifiers === 'array' ? hasIdentifiers : [ {type: 'ISBN_13', identifier: '9780571310302'} ];
	if (hasTitle) book.title = typeof hasTitle === 'string' ? hasTitle : 'Geek Sublime: Writing Code, Writing Fiction';
	if (hasAuthors) book.authors = typeof hasAuthors === 'object' ? hasAuthors : [{ firstName: 'Nancy', lastName: 'Fraser' }];
	if (hasYear) book.year = typeof hasYear === 'int' ? hasYear : 2010;

	return book;
}