/**
 * SourceDashboard
 *
 * // TODO: Figure out how to do Actions get Source on App level.
 */
(function() {
	'use strict';

	var React = require('react');
	var Cursor = require('react-cursor').Cursor;
	var Actions = require('../actions/Actions.js');
	var SourceStore = require('../stores/SourceStore.js');
	var Helpers = require('../helpers/helpers.js');

	var SourceDashboard = React.createClass({

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
				<div className="source-dashboard eight columns">
					<header className="source">
						<div className="title-info">
							<span className="source-type">{source ? source.get('type') : null}</span>
							<h1 className="title">
								{source ? source.get('title') : null}{source && source.get('subtitle') !== '' ? ':' : null} {source ? source.get('subtitle') : null} ({source ? source.get('year') : null})
							</h1>
							<p className="authors">{authors || null}</p>
						</div>
						<img className="image" src={imageUrl} />
						<p className="description"><span className="description-label">Summary</span>{source ? source.get('abstract').trunc(275, true) : null}</p>
					</header>
				</div>
			);
		},

	});

	module.exports = SourceDashboard;

}());