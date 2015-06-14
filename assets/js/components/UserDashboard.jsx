/**
 * UserDashboard
 */
(function() {
	'use strict';

	var $ = require('jquery');

	// Flux
	var Actions = require('../actions/Actions.js');
	var SourceStore = require('../stores/SourceStore.js');
	// var RecommendationStore = require('../stores/RecommendationStore.js');

	// Router
	var Navigation = require('react-router').Navigation;

	var React = require('react');

	var Book = React.createClass({

		handleClick: function(e) {
			e.preventDefault();
			publish('/app/transitionTo', ['/source/'+this.props.source.get('id')]);
		},

		render: function() {
			var source, authors;

			source = this.props.source;

			authors = !source ? null : source.get('authors').map(function(author,key) {
				return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
			});

			return(
				<article className="source book eight columns" onClick={this.handleClick}>
					<div className="cover">
						<img className="image" src={!source ? '' : source.get('imageLinks').thumbnail} alt="Book Cover" />
					</div>
					<div className="info">
						<div className="meta">
							<h3 className="title">{!source ? '' : source.get('title')}</h3>
							<h5 className="subtitle">{!source ? '' : source.get('subtitle')}</h5>
							<span className="authors">by {authors}</span>
						</div>
					</div>
				</article>
			);
		}

	});

	var UserFeed = React.createClass({

		render: function() {
			var books;

			books = this.props.recommendations ? this.props.recommendations.map(function(item, i) {
				return <Book key={i} source={item} />;
			}) : null;

			return (
				<div className="user-feed">
					{books}
				</div>
			);
		}

	});

	var UserDashboard = React.createClass({

		componentDidMount: function() {
			SourceStore.addUpdateListener(this.onUpdate);
				// Previously I had called this passing this.update.bind(this), but React gave a warning 
				// saying that React does it in an optimized way. Took it out and it seems to be working.
			Actions.getRecommendations(this.props.user.refine('id').value);
		},

		componentWillUmount: function() {
			RecommendationStore.removeUpdateListener(this.update);
		},

		render: function() {
			return(
				<div className="user-dashboard">
					<UserFeed recommendations={this.props.sources.value ? this.props.sources.value.models : null} />
				</div>
			);
		}

	});

	module.exports = UserDashboard;

}());



