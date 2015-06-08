/**
 * UserDashboard
 */

var $ = require('jquery');

// Flux
var Actions = require('../actions/Actions.js');
var RecommendationStore = require('../stores/RecommendationStore.js');

import React from 'react';

class Book extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			book: null
		}
	}

	componentWillMount() {
		var self = this;
		$.ajax({
			method: 'GET',
			url: '/sources/'+this.props.sourceId
		})
		.done(function(data) {
			self.setState({book: data});
		});
	}

	render() {
		var book, authors;

		book = this.state.book;

		authors = !book ? null : book.authors.map(function(author,key) {
			return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
		});

		return(
			<article className="book">
				<h1 className="title">{!book ? '' : book.title}</h1>
				<img className="cover-image" src={!book ? '' : book.imageLinks.thumbnail} alt="Book Cover" />
				<span className="author">{authors}</span>
			</article>
		);
	}

}

class UserFeed extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var books;

		books = this.props.recommendations.map(function(item, i) {
			console.log(item);
			return <Book key={i} sourceId={item.id} />;
		});

		return (
			<div className="user-feed">
				{books}
			</div>
		);
	}

}

export class UserDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			recommendations: []
		};
	}

	componentDidMount() {
		RecommendationStore.addUpdateListener(this.update.bind(this));
		Actions.getRecommendations(this.props.user.refine('id').value);
	}

	componentWillUmount() {
		RecommendationStore.removeUpdateListener(this.update.bind(this));
	}

	update(data) {
		this.setState({recommendations: data});
	}

	render() {
		return(
			<div className="user-dashboard">
				<UserFeed recommendations={this.state.recommendations} />
			</div>
		);
	}
}

