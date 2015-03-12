/**
 * Onboarding
 */
(function() {
	'use strict';

	var React = require('react');
	var Register = require('./Register.jsx');
	var OtherInterests = require('./OtherInterests.jsx');
	var SelectDiscipline = require('./SelectDiscipline.jsx');

	var Classable = require('./mixins/classable.js');

	/**
	 * Onboarding
	 */
	var Onboarding = React.createClass({

		mixins: [Classable, React.addons.LinkedStateMixin],

		getInitialState: function() {
			return {
				'userCreated': false,
				'disciplineIsValid': false,
			}
		},

		render: function() {
			var message,
					stage = this.state.stage;

			if (!this.state.userCreated) {
				message = <div className="message"><h3>Kanon</h3><br/><p>Your inviter filled in some details for you.</p></div>
			} else if (!this.state.disciplineIsValid) {
				message = <div className="message"><h4>It is a pleasure to meet you Clare! What is your academic field?</h4></div>;
			} else {
				message = <div className="message"><h4>What a great field! What other areas of scholarship do you follow?</h4></div>
			}

			var content = !this.state.userCreated ? (
				<div className="onboarding form-wrap z-depth-1">
					{message}
					<Register valueLink={this.linkState('userCreated')} />
				</div>
			) : (
				<div className="onboarding form-wrap z-depth-1">
					{message}
					<form className="interests-form ">
						<SelectDiscipline valueLink={this.linkState('disciplineIsValid')} />
						<br/>
						<OtherInterests className={ (!this.state.disciplineIsValid) ? 'hide' : '' } />
						<input type="submit" value="Submit" className={ (!this.state.disciplineIsValid) ? 'hide' : '' } />
					</form>
				</div>
			);

			var classes = this.getClasses('columns', {
				'eight offset-by-two': this.state.userCreated,
				'four offset-by-four': !this.state.userCreated
			});

			return(
				<div className={classes}>
					{content}
				</div>
			);
		}
	});

	module.exports = Onboarding;

}());