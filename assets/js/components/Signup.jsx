/**
 * Singup
 */
(function () {
	'use strict';

	var React = require('react');
	var Onboarding = require('./Onboarding.jsx');

	var Signup = React.createClass({

		render: function() {
			return(
				<div id="signup-app" className="not-logged-in">
					<Onboarding />
				</div>
			);
		}
	});

	module.exports = Signup;

}());