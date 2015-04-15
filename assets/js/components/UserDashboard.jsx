/**
 * UserDashboard
 */

import React from 'react';

class Book extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.book.volumeInfo.title,
			author: this.props.book.volumeInfo.authors[0],
			image: this.props.book.volumeInfo.imageLinks.thumbnail
		}
	}

	render() {
		return(
			<article className="book">
				<h1 className="title">{this.state.title}</h1>
				<img className="cover-image" src={this.state.image} alt="Book Cover" />
				<span className="author">{this.state.author}</span>
			</article>
		);
	}

}

class UserFeed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			books: []
		};
	}
	
	componentWillMount() {
		var self = this;
		$.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/books/v1/volumes?q=german+idealism',
      })
      .done(function(data) {
      	var books = $.map(data.items, function(v,k) { return v; });
      	self.setState({'books': books});
      });
	}

	render() {
		var books;

		books = this.state.books.map(function(book, i) {
			return <Book key={i} book={book} />;
		});

		return (
			<div className="user-feed">
				{books}
			</div>
		);
	}

}

export class UserDashboard extends React.Component {
	render() {
		return(
			<div className="user-dashboard">
				<UserFeed />
			</div>
		);
	}
}

