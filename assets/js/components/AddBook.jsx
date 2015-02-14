'use strict';
/**
 * AddBook
 */

var React = require('react');
var NewBookForm = require('./NewBookForm.jsx');

var AddBook = React.createClass({

	render: function() {
		return(
			<div>
			<h1>Add a Book</h1>
			<NewBookForm url="/book" />
			</div>
		);
	}
});

module.exports = AddBook;