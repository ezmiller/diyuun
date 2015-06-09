/**
 * Login
 */
(function() {
	'use strict';

	var React = require('react');
	var Controlbar = require('./Controlbar.jsx');
	var LoginForm = require('./LoginForm.jsx');

	var Login = React.createClass({
		render: function() {
			return (
				<div id="signup-app" className="not-logged-in">
					<div id="container">
						<div className="content">
							<LoginForm />
						</div>
					</div>
				</div>
			);
		}
	});

	module.exports = Login;

}());