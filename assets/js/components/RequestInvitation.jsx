/**
 * RequestInvitation
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');
	var Input = require('./Input.jsx');
	var PrimaryButton = require('./PrimaryButton.jsx');

	var RequestInvitation = React.createClass({

		mixins: [Classable],

		render: function() {

			var gridClasses =this.getClasses('col s4 offset-s4', {});
			var wrapClasses = this.getClasses('invitation form-wrap', {});

			return (
				<div className={gridClasses}>
					<div className={wrapClasses}>
						<h1>KANON</h1>
						<h4>Kanon is a place to discuss scholarship and ideas</h4>
						<br/>
						<form class="invitation-form">
							<Input id="name" ref="name" label="Name"  />
							<br/>
							<Input id="email" ref="email" label="Email"  />
							<br/>
							<PrimaryButton linkButton={true} to="signup" label="Request Invitation" />
						</form>
					</div>
				</div>
			);
		}

	});

	module.exports = RequestInvitation;

}());