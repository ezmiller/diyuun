/**
 * Onboarding
 */
(function() {
	'use strict';

	var React = require('react');
	var Register = require('./Register.jsx');
	var DiscoverInterests = require('./DiscoverInterests.jsx');
	var Classable = require('./mixins/classable.js');

	/**
	 * Onboarding
	 */
	var Onboarding = React.createClass({

		mixins: [Classable, React.addons.LinkedStateMixin],

		getInitialState: function() {
			return {
				'userCreated': false,
			}
		},

		render: function() {

			var content = !this.state.userCreated ? (
				<div>
					<div className="message"><h3>Kanon</h3><br/><p>Your inviter filled in some details for you.</p></div>
					<Register valueLink={this.linkState('userCreated')} />
				</div>
			) : ( <DiscoverInterests user={this.state.userCreated} /> );

			var classes = this.getClasses('columns', {
				'eight offset-by-two': this.state.userCreated,
				'four offset-by-four': !this.state.userCreated
			});

			return(
				<div className={classes}>
					<div className="onboarding form-wrap z-depth-1">
					{content}
					</div>
				</div>
			);
		}
	});

	module.exports = Onboarding;

}());