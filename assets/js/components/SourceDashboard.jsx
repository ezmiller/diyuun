/**
 * SourceDashboard
 *
 * // TODO: Figure out how to do Actions get Source on App level.
 */
(function() {
	'use strict';

	var React = require('react');
	var Router = require('react-router');
	var Cursor = require('react-cursor').Cursor;
	var Actions = require('../actions/Actions.js');
	var SourceStore = require('../stores/SourceStore.js');
	var Helpers = require('../helpers/helpers.js');
	var moment = require('moment');

	var Discussion = React.createClass({
		
		propTypes: {
			discussion: React.PropTypes.object.isRequired
		},

		getDefaultProps: function () {
		  return {
				discussion: null  
		  };
		},

		render: function() {
			var updated = new moment(this.props.discussion.get('updatedAt'));
			return (
				<article className="discussion">
					<header>
						<h3 className="title">{this.props.discussion.get('title')}</h3>
						<span className="last-updated">Updated {updated.format('MMMM Do, YYYY')}</span>
					</header>
				</article>
			);
		}
	});

	var DiscussionsList = React.createClass({

		propTypes: {
			discussions: React.PropTypes.object.isRequired
		},

		getDefaultProps: function () {
			return {
				discussions: []
			};
		},

		render: function() {
			var dicussionNodes = this.props.discussions.value.map(function(discussion, i) {
				return <Discussion key={i} discussion={discussion} />;
			});
			return(
				<section className="discussion-list">
					{dicussionNodes}
				</section>
			);
		}
	});

	var SourceDashboard = React.createClass({

		mixins: [Router.State],

		propTypes: {
      sources: React.PropTypes.instanceOf(Cursor).isRequired
    },

    componentDidMount: function () {
    	console.log('SourceDashboard::componentDidMount(), urlparams: ', this.getParams());
      if (this.getParams().sourceId) {
      	Actions.getSource(this.getParams().sourceId);
      	Actions.getDiscussionsForSource(this.getParams().sourceId);
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
					<DiscussionsList discussions={this.props.discussions} />
				</div>
			);
		},

	});

	module.exports = SourceDashboard;

}());