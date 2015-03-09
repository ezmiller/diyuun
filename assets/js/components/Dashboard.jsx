/**
 * AuthStore
 */
(function() {
	'use strict';

	var React = require('react');

	var Dashboard = React.createClass({
		render:function() {
			return(
				<div className="main dashboard">
					<p>This is your dashboard.</p>
				</div>
			);
		}
	});

	module.exports = Dashboard;

}());