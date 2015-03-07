/**
 * AuthStore
 */
(function() {
	'use strict';

	var React = require('react');

	var Dashboard = React.createClass({
		render:function() {
			return(
				<div class="dashboard">
				<p>This is your dashboard.</p>
				</div>
			);
		}
	});

	module.exports = Dashboard;

}());