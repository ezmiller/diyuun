/**
 * DiscoverInterests
 */
(function() {
	'use strict';

	var React = require('react');
	var OtherInterests = require('./OtherInterests.jsx');
	var SelectDiscipline = require('./SelectDiscipline.jsx');
	var Cursor = require('react-cursor').Cursor;

	var DiscoverInterests = React.createClass({

		getInitialState: function() {
			return {
				'discipline': false,
				'user': null
			}
		},

		componentDidMount: function() {
			var self = this;
			var handle = subscribe('discipline', function(discipline) {
				self.setState({'discipline': discipline});
			});
		},

		handleSubmit: function(e) {
			var self = this;

			e.preventDefault();

			// Gather the user's interests
			var update = {};
			update.discipline = this.state.discipline;
			update.interests = this.refs.interests.state.selectedTags;

			// Update and then save
			this.updateUser(update, this.saveUser);
		},

		updateUser: function(data, callback) {
			$.ajax({
				method: 'POST',
				url: '/pendingusers/update/'+ this.props.user.id,
				contentType: 'application/json',
				data: JSON.stringify(data),
			})
			.done(function(data) {
				console.log('DiscoverInterests::handleSubmit() success: ', data);
				callback();
			})
			.fail(function(jqXhr) {
				console.log('DiscoverInterests::handleSubmit() err: ', jqXhr);
			});
		},

		saveUser: function() {
			$.get('/pendingusers/save/' + this.props.user.id, function(data) {
				console.log('DiscoverInterests::saveUser() returned: ', data);
			});
		},

		render: function() {
			var self = this,
					message = '';

		 	if (!this.state.discipline) {
				message = <div className="message"><h4>It is a pleasure to meet you {this.props.user.firstName}! What is your academic field?</h4></div>;
			} else {
				message = <div className="message"><h4>What a great field! What other areas of scholarship do you follow?</h4></div>
			}

			var cursor = Cursor.build(this);

			return (
				<form className="interests-form" onSubmit={this.handleSubmit}>
					{message}
					<SelectDiscipline discipline={cursor.refine('discipline')} />
					<br/>
					<OtherInterests ref="interests" className={ (!this.state.discipline) ? 'hide' : '' } />
					<input type="submit" value="Submit" className={ (!this.state.discipline) ? 'hide' : '' } />
				</form>
			);
		}
	})

	module.exports = DiscoverInterests;

}());