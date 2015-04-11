/**
 * Onboarding
 *
 * TODO: Handle case where user registers with pw but then doesn't finish.
 * 
 */
(function() {
	'use strict';

	// React & Components.
	var React = require('react');
	var Register = require('./Register.jsx');
	var OtherInterests = require('./OtherInterests.jsx');
	var SelectDiscipline = require('./SelectDiscipline.jsx');

	// Mixins.
	var State = require('react-router').State;
	var Classable = require('./mixins/classable.js');

	var Cursor = require('react-cursor').Cursor;

	var Onboarding = React.createClass({

		mixins: [Classable, State],

		getInitialState: function() {
			return {
				'pendingUserToken': this.getParams().token,
				'pendingUser': false,
				'newUser': false,
				'discipline': false,
				'interests': false,
				'userSaved': false
			}
		},

		componentWillMount: function () {
			var self = this;
			$.get('/pendingusers/' + this.state.pendingUserToken, function(data) {
				data.name = data.firstName + ' ' + data.lastName;
				self.setState({'pendingUser': data});
			});
		},

		handleSubmit: function(e) {
			var self = this;

			e.preventDefault();

			// Gather the user's interests
			var update = {};
			update.discipline = this.state.discipline;
			update.interests = this.state.interests;

			// Update and then save
			this.updateUser(update, this.saveUser);
		},

		updateUser: function(data, callback) {
			$.ajax({
				method: 'POST',
				url: '/pendingusers/update/'+ this.state.pendingUserToken,
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
			var self = this;
			$.get('/pendingusers/save/' + this.state.pendingUserToken, function(data) {
				console.log('DiscoverInterests::saveUser() returned: ', data);
				self.setState({'newUser': data, 'userSaved': true});
			});
		},

		render: function() {
			var content,
					message = '',
					cursor = Cursor.build(this);

			if (!this.state.newUser) {
				content = (
					<div>
						<div className="message"><h3>Kanon</h3><br/><p>Your inviter filled in some details for you.</p></div>
						<Register pendingUser={cursor.refine('pendingUser')} newUser={cursor.refine('newUser')} />
					</div>
				);
			} else if (!this.state.userSaved) {
				if (!this.state.discipline) {
					message = <div className="message"><h4>It is a pleasure to meet you {this.state.newUser.firstName}! What is your academic field?</h4></div>;
				} else {
					message = <div className="message"><h4>What a great field! What other areas of scholarship do you follow?</h4></div>
				}
				content = (
					<form className="interests-form" onSubmit={this.handleSubmit}>
						{message}
						<SelectDiscipline discipline={cursor.refine('discipline')} />
						<br/>
						<OtherInterests interests={cursor.refine('interests')} className={ (!this.state.discipline) ? 'hide' : '' } />
						<input type="submit" value="Submit" className={ (!this.state.discipline) ? 'hide' : '' } />
					</form>
				);
			} else {
				content = (
					<div>
						<div className="message"><h4>You have successfully registered, Thank you! We hope that you enjoy Kanon.</h4></div>
						<a href="/login" className="button">Login to Kanon</a>
					</div>
				);
			}

			var classes = this.getClasses('columns', {
				'eight offset-by-two': this.state.newUser,
				'four offset-by-four': !this.state.newUser
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