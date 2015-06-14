/**
 * SourceDashboard
 *
 * // TODO: Figure out how to do Actions get Source on App level.
 */
(function() {
	'use strict';

	var React = require('react');
	var Cursor = require('react-cursor').Cursor;
	var Router = require('react-router');
	var Actions = require('../actions/Actions.js');
	var SourceStore = require('../stores/SourceStore.js');

	var SourceDashboard = React.createClass({

		mixins: [Router.State],

		propTypes: {
      sources: React.PropTypes.instanceOf(Cursor).isRequired
    },

    componentDidMount: function () {
    	console.log('SourceDashboard::componentDidMount(), urlparams: ', this.getParams());
      if (this.getParams().sourceId) {
      	Actions.getSource(this.getParams().sourceId);
      }
    },

		render: function() {
			var source, authors, imageUrl;

			source = this.props.sources.value ? this.props.sources.value.models[0] : null;
			imageUrl = source ? source.get('imageLinks').thumbnail : '/images/book-icon.svg';
			authors = source ? source.get('authors').map(function(author,key) {
				return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
			}) : null;

			return(
				<div className="source-dashboard">
					<div className="source">
						<img className="image" src={imageUrl}  alt="Book Cover" />
						<div className="metadata">
							<h1 className="title">{source ? source.get('title') : null}</h1>
							<h2 className="subtitle">{source ? source.get('subtitle') : null}</h2>
							<p className="authors">{authors || null}</p>
							<p className="description">{source ? source.get('abstract') : null}</p>
						</div>
					</div>
				</div>
			);
		},

	

	});

	module.exports = SourceDashboard;

}());