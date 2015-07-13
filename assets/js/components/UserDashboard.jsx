/**
 * UserDashboard
 */
(function() {
	'use strict';

	var $ = require('jquery');
	var React = require('react');
	var Source = require('./Source.jsx');
	var Actions = require('../actions/Actions.js');
	var SourceStore = require('../stores/SourceStore.js');
	var BackboneModel = require('backbone').Model;

	var UserFeed = React.createClass({

		getDefaultProps: function () {
	    return {
	    	sources: null  
	    };
		},

		render: function() {
			var sources;

			sources = this.props.sources ? this.props.sources.map(function(item, i) {
				return <Source key={i} source={item} />;
			}) : null;

			return (
				<div className="user-feed">
					{sources}
				</div>
			);
		}

	});

	var UserDashboard = React.createClass({

		PropTypes: {
			sources: React.PropTypes.string.isRequired
		},

		getDefaultProps: function () {
	    return {
	    	sources: null
	    };
		},

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
					<UserFeed sources={this.props.sources.value ? this.props.sources.value.models : null} />
				</div>
			);
		}

	});

	module.exports = UserDashboard;

}());



