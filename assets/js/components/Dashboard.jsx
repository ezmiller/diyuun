/**
 * Dashboard
 */
(function() {
	'use strict';

	var React = require('react');
	var Section = require('./Section.jsx');

	var Dashboard = React.createClass({
		render:function() {
			return(
				<Section className="dashboard">
					<p>This is your dashboard.</p>
				</Section>
			);
		}
	});

	module.exports = Dashboard;

}());