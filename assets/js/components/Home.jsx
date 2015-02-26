/**
 * Home
 */
(function() {
	'use strict';

	var React = require('react');
	var Section = require('./Section.jsx');
	var Control = require('./Control.jsx');
	var RequestInvitation = require('./RequestInvitation.jsx');


	var Home = React.createClass({
		render: function() {
			return (
				<div className="home">
					<header>
						<Control />
					</header>
					<div id="main">
						<Section className="above-fold">
							<RequestInvitation />
						</Section>
					</div>
				</div>
			);
		}
	});

	module.exports = Home;

}());