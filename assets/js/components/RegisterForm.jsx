/**
 * RegisterForm
 */
(function() {
	'use strict';

	// Load React and necessary components.
	var React = require('react');
	var UserStore = require('../stores/UserStore.js');
	var UserActions = require('../actions/UserActions.js');
	var mui = require('material-ui');
	var TextField = mui.TextField;
	var RaisedButton = mui.RaisedButton;

	var RegisterForm = React.createClass({

		getInitialState: function () {
		    return {
		        username: '',
		        password: ''
		    };
		},

		componentDidMount: function () {
			console.log('RegistrationForm::componentDidMount() called');
		},

		componentWillUnmount: function () {
			console.log('RegistrationForm::componentWillMount() called');
		},

		onSubmit: function(e) {
			console.log('RegistrationForm::onSubmit() called');
			var user = {};
			e.preventDefault();

			user.email = this.state.email.trim();
			user.username = user.email;
			user.password = this.state.password.trim();

			this.register(user);
		},

		handleChange: function(e) {
			var newState = {};
		    newState[e.target.name] = e.target.value;
		    console.log('RegistrationForm::handleChange() newstate', newState);
		    this.setState(newState);
		},

		register: function(user) {
			console.log('RegistrationForm:authenticate() will try to authenticate user: ', user);

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local/register',
				data: user
			})
			.done(function(data, textStatus) {
				console.log(textStatus);
				console.log(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			});

		},

		render: function() {
			return (
				<form  className="login" onSubmit={this.onSubmit} role="form">
				<h4>Register</h4>
				<div>
	        	<TextField
	         	  type="email"
		          name="email"
		          ref="email"
		          required="required"
		          hintText="Email"
		          floatingLabelText="Email"
		          onChange={this.handleChange} />
		        </div>
		        <div>
	          	<TextField
		          name="password"
		          ref="password"
		          required="required"
		          hintText="Password"
		          floatingLabelText="Password" 
		          onChange={this.handleChange} />
		        </div>
		        <br/>
		        <RaisedButton label="Login" />
		        </form>
			);
		}

	});

	module.exports = RegisterForm;

}());