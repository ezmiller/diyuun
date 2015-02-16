/**
 * LoginForm
 * @jsx React.DOM
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

	var LoginForm = React.createClass({

		getInitialState: function () {
		    return {
		        identfier: '',
		        password: ''
		    };
		},

		componentDidMount: function () {
			console.log('LoginForm::componentDidMount() called');
		},

		componentWillUnmount: function () {
			console.log('LoginForm::componentWillMount() called');
		},

		onSubmit: function(e) {
			console.log('LoginForm::onSubmit() called');
			e.preventDefault();
			var user = {};
			user.identifier = this.state.identifier.trim();
			user.password = this.state.password.trim();
			this.authenticate(user);
		},

		handleChange: function(e) {
			var newState = {};
		    newState[e.target.name] = e.target.value;
		    console.log('LoginForm::handleChange() newstate', newState);
		    this.setState(newState);
		},

		authenticate: function(user) {
			console.log('LoginForm:authenticate() will try to authenticate user: ', user);

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local',
				data: user
			})
			.done(function(data, textStatus) {
				console.log(textStatus);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
			});

		},

		render: function() {
			return (
				<form  className="login" onSubmit={this.onSubmit} role="form">
				<div>
	        	<TextField
	         	  type="email"
		          name="identifier"
		          ref="identifier"
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

	module.exports = LoginForm;

}());