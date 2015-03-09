/**
 * Home
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');

	// React & Components
	var React = require('react');
	var Section = require('./Section.jsx');
	var Controlbar = require('./Controlbar.jsx');
	var Dashboard = require('./Dashboard.jsx');
	var RequestInvitation = require('./RequestInvitation.jsx');

	var Home = React.createClass({

		render: function() {
			return (
				<div className="main home">
					<Dashboard />
				</div>
			);
		}

	});

	module.exports = Home;

}());