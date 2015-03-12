/**
 * DiscoverInterests
 */
(function() {
	'use strict';

	var React = require('react');
	var OtherInterests = require('./OtherInterests.jsx');
	var SelectDiscipline = require('./SelectDiscipline.jsx');

	var DiscoverInterests = React.createClass({

		getInitialState: function() {
			return {
				'discipline': false,
			}
		},

		componentDidMount: function() {
			var self = this;
			var handle = subscribe('discipline', function(discipline) {
				self.setState({'discipline': discipline});
			})
		},

		handleSubmit: function(e) {
			e.preventDefault();

			var update = {};
			update.discipline = this.state.discipline;
			update.interests = this.refs.interests.state.selectedTags;
			console.log(JSON.stringify(update));

			$.ajax({
				method: 'POST',
				url: '/users/'+ this.props.userId,
				contentType: 'application/json',
				data: JSON.stringify(update),
			})
			.done(function(data) {
				console.log('DiscoverInterests::handleSubmit() success: ', data);
			})
			.fail(function(jqXhr) {
				console.log('DiscoverInterests::handleSubmit() err: ', jqXhr);
			});
		},

		render: function() {
			var self = this,
					message = '';

		 	if (!this.state.discipline) {
				message = <div className="message"><h4>It is a pleasure to meet you Clare! What is your academic field?</h4></div>;
			} else {
				message = <div className="message"><h4>What a great field! What other areas of scholarship do you follow?</h4></div>
			}

			return (
				<form className="interests-form" onSubmit={this.handleSubmit}>
					{message}
					<SelectDiscipline />
					<br/>
					<OtherInterests ref="interests" className={ (!this.state.discipline) ? 'hide' : '' } />
					<input type="submit" value="Submit" className={ (!this.state.discipline) ? 'hide' : '' } />
				</form>
			);
		}
	})

	module.exports = DiscoverInterests;

}());