/**
 * Login
 */
(function() {
	'use strict';

	var React = require('react');
	var Section = require('./Section.jsx');
	var Controlbar = require('./Controlbar.jsx');
	var LoginForm = require('./LoginForm.jsx');

	var Login = React.createClass({
		render: function() {
			return (
				<Section className="above-fold">
					<LoginForm />
				</Section>
			);
		}
	});

	module.exports = Login;

}());