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
					<div id="container">
						<div className="content">
							<Onboarding />
						</div>
					</div>
				</div>
			);
		}
	});

	module.exports = Signup;

}());