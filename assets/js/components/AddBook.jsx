'use strict';
/**
 * AddBook
 */

var React = require('react');
var Errors = require('./Errors.jsx');
var NewBookForm = require('./NewBookForm.jsx');

var AddBook = React.createClass({

	render: function() {
		return(
			<div>
			<Errors namespace="books" />
			<NewBookForm url="/book" />
			</div>
		);
	}
});

module.exports = AddBook;