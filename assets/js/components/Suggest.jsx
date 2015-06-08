/**
 * Suggest
 *
 * // TODO: Convert server call to Flux.
 * // TODO: Add appropriate error handling.
 * 
 */
(function() {
	'use strict';

	var $ = require('jquery');

	var AuthStore = require('../stores/AuthStore.js');

	var React = require('react');
	var Search = require('./Search.jsx');
	var StarRating = require('./StarRating.jsx');
	var Router = require('react-router');
	var Link = Router.Link;

	var Suggest = React.createClass({

		getInitialState: function () {
	    return {
	    	user: AuthStore.getCurrentUser(),
        source: null,
        'rating': null,
				'text': '',
				'done': false
	    };
		},

		handleRecommendClick: function(source) {
			this.setState({source: source});
		},

		handleSubmit: function(e) {
			var self = this;

			e.preventDefault();

			var recommendation = {
				'user': this.state.user,
				'source': this.state.source,
				'discipline': this.state.user.discipline,
				'rating': this.state.rating,
				'text': this.state.text
			};

			$.ajax({
				type: 'POST',
				url: '/recommendations',
				data: recommendation
			})
			.done(function(data) {
				self.setState({done: true});
			})
			.fail(function(jqXhr) {
				console.log('recommendation submit request failed', jqXhr);
			});

		},

		backToResults: function(e) {
			e.preventDefault();
			this.setState({source: null});
		},

		handleInputChange: function(e) {
			var newVal = {};
			newVal[e.target.id] = e.target.value;
			this.setState(newVal);
		},

		handleRatingChange: function(newRating) {
			this.setState({rating: newRating});
		},

		render: function() {
			var source = this.state.source,
					done = this.state.done,
					authors,
					content;

			authors = !source ? null : source.authors.map(function(author,key) {
				return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
			});

			if (!source) {
				content = <Search handler={this.handleRecommendClick} />;
			} else if (!done) {
				content = (
					<form className="recommendation-form" onSubmit={this.handleSubmit} >
						<div className="source">
							<img className="image" src={source.imageLinks ? source.imageLinks.thumbnail : 'images/book-icon.svg'}  alt="Book Cover" />
							<div className="metadata">
								<h1 className="title">{this.state.source.title}</h1>
								<h2 className="subtitle">{this.state.source.subtitle}</h2>
								<p className="authors">{authors}</p>
								<p className="description">{this.state.source.description}</p>
							</div>
						</div>
						<label htmlFor="rating">How important is this book to the field?</label>
						<StarRating handler={this.handleRatingChange} range={5} />
						<textarea 
							id="text"
							className="recommend-msg" 
							onChange={this.handleInputChange}
							placeholder="Why is this text important?" />
						<button>Submit</button>
						<button onClick={this.backToResults}>Back</button>
					</form>
				);
			} else {
				content = (
					<div class="thankyou">
						<p class="message standard">Thank you for making a recommendation!</p>
						<Link to="home">Return to Feed</Link>
					</div>
				);
			}

		
			return (
				<div className="suggest">
					{content}
				</div>
			);
		}
	});

	module.exports = Suggest;

}());