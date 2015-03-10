/**
 * Send Invite
 */
(function() {
	'use strict';

	// React & Components
	var React = require('react');
	var Section = require('./Section.jsx');
	var Input = require('./Input.jsx');

	// Mixins.
	var Classable = require('./mixins/classable.js');

	var SendInvite = React.createClass({

		mixins: [Classable],

		render: function() {

			var gridClasses =this.getClasses('column two-thirds offset-by-two', {});
			var wrapClasses = this.getClasses('send-invite form-wrap z-depth-1', {});

			return (
				<Section className="above-fold">
					<div className={gridClasses}>
						<div className={wrapClasses}>
							<form className="send-invite-form" role="form">
								<h4>Send an invite...</h4>
								<Input
									type="text"
				          name="name"
				          ref="name"
				          placeholder="Full Name" />
				        <Input
									type="text"
				          name="email"
				          ref="email"
				          placeholder="Email Address" />
				        <Input
									type="text"
				          name="title"
				          ref="title"
				          placeholder="Title" />
			          <Input
									type="text"
				          name="institution"
				          ref="institution"
				          placeholder="Institution" />
			        </form>
			      </div>
			    </div>
				</Section>
			);
		}
	});

	module.exports = SendInvite;
}());