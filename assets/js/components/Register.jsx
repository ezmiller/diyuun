/**
 * Register
 */
(function() {
	'use strict';

	var React = require('react');
	var RegisterForm = require('./RegisterForm.jsx');

	var Register = React.createClass({
		render: function() {
			return (
				<div>
				<RegisterForm />
				</div>
			);
		}
	});

	module.exports = Register;

}());