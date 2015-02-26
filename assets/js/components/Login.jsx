/**
 * Login
 */
(function() {
	'use strict';

	var React = require('react');
	var Section = require('./Section.jsx');
	var Control = require('./Control.jsx');
	var LoginForm = require('./LoginForm.jsx');

	var Login = React.createClass({
		render: function() {
			return (
				<div className="login">
					<header>
						<Control />
					</header>
					<div id="main">
						<Section className="above-fold">
							<LoginForm />
						</Section>
					</div>
				</div>
			);
		}
	});

	module.exports = Login;

}());