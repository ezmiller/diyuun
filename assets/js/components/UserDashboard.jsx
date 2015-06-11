/**
 * UserDashboard
 */
(function() {
	'use strict';

	var $ = require('jquery');

	// Flux
	var Actions = require('../actions/Actions.js');
	var RecommendationStore = require('../stores/RecommendationStore.js');

	// Router
	var Navigation = require('react-router').Navigation;

	var React = require('react');

	var Book = React.createClass({

		getInitialState: function () {
	    return {
	      book: null    
	    };
		},

		componentWillMount: function() {
			var self = this;
			$.ajax({
				method: 'GET',
				url: '/sources/'+this.props.sourceId
			})
			.done(function(data) {
				self.setState({book: data});
			});
		},

		render: function() {
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

	});

	var UserFeed = React.createClass({

		render: function() {
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

	});

	var UserDashboard = React.createClass({

		getInitialState: function () {
	    return {
	      recommendations: []
	    };
		},

		componentDidMount: function() {
			RecommendationStore.addUpdateListener(this.update.bind(this));
			Actions.getRecommendations(this.props.user.refine('id').value);
		},

		componentWillUmount: function() {
			RecommendationStore.removeUpdateListener(this.update.bind(this));
		},

		update: function(data) {
			this.setState({recommendations: data});
		},

		render: function() {
			return(
				<div className="user-dashboard">
					<UserFeed recommendations={this.state.recommendations} />
				</div>
			);
		}
	});

	module.exports = UserDashboard;

}());



