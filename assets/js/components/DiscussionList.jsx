/**
 * DiscussionList
 */
(function() {
	'use strict';

	var React = require('react');

	var DiscussionItem = React.createClass({

		getDefaultProps: function () {
		  return {
				 data: {}
		  };
		},
		render: function() {
			return (
				<div className="discussion-item">
					<header>
						<h1>{this.props.data.title}</h1>
					</header>
					<div className="discussion-prompt">
						{this.props.data.prompt}
					</div>
				</div>
			);
		}
	});

	var DiscussionList = React.createClass({

		getDefaultProps: function () {
		  return {
				discussions: null  
		  };
		},

		render: function() {
			var discussionItems, discussions;

			discussions = this.props.discussions.value;

			discussionItems = (discussions !== null) ? discussions.map(function(k,v) {
				return <DiscussionItem data={v} />
			}) : null;

			return (
				<div className="discussion-list">
					{discussionItems}
				</div>
			);
		}

	});

	module.exports = DiscussionList;
	
}());