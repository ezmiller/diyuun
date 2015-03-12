/**
 * DiscoverInterests
 */
(function() {
	'use strict';

	var React = require('react');
	var OtherInterests = require('./OtherInterests.jsx');
	var SelectDiscipline = require('./SelectDiscipline.jsx');

	var DiscoverInterests = React.createClass({

		mixins: [React.addons.LinkedStateMixin],

		getInitialState: function() {
			return {
				'discipline': false,
			}
		},

		handleSubmit: function(e) {
			e.preventDefault();
			console.log('DiscoverInterests::handleSubmit()');
		},

		render: function() {
			var message = '';

		 	if (!this.state.discipline) {
				message = <div className="message"><h4>It is a pleasure to meet you Clare! What is your academic field?</h4></div>;
			} else {
				message = <div className="message"><h4>What a great field! What other areas of scholarship do you follow?</h4></div>
			}

			return (
				<form className="interests-form" onSubmit={this.handleSubmit}>
					{message}
					<SelectDiscipline valueLink={this.linkState('discipline')} />
					<br/>
					<OtherInterests className={ (!this.state.discipline) ? 'hide' : '' } />
					<input type="submit" value="Submit" className={ (!this.state.discipline) ? 'hide' : '' } />
				</form>
			);
		}
	})

	module.exports = DiscoverInterests;

}());