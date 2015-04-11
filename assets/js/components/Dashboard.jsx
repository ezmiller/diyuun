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
				<section className="dashboard">
					<p>This is your dashboard.</p>
				</section>
			);
		}
	});

	module.exports = Dashboard;

}());