'use strict';
/**
 * AddBook
 */

define(
[
	'react',
	'components/Errors',
	'components/NewBookForm',
],
function(React, Errors, NewBookForm) {

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

return AddBook;

}); // define