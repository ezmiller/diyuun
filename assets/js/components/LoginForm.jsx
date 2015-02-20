/**
 * LoginForm
 * @jsx React.DOM
 */
(function() {
	'use strict';

	// Load React and necessary components.
	var React = require('react');
	var Router = require('react-router');
	var Link = Router.Link;
	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');
	var mui = require('material-ui');
	var Paper = mui.Paper;
	var TextField = mui.TextField;
	var RaisedButton = mui.RaisedButton;
	var Dialog = mui.Dialog;

	var LoginForm = React.createClass({

		getInitialState: function () {
		    return {
		    	  error: '',
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

		handleChange: function(e) {
			var newState = {};
		    newState[e.target.name] = e.target.value;
		    console.log('LoginForm::handleChange() newstate', newState);
		    this.setState(newState);
		},

		onSubmit: function(e) {
			console.log('LoginForm::onSubmit() called');
			e.preventDefault();
			var user = {};
			user.identifier = this.state.identifier.trim();
			user.password = this.state.password.trim();
			this.login(user);
		},

		login: function(user) {
			var that = this;
			console.log('LoginForm::login() called with user: ', user);

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local',
				data: user
			})
			.done(this.onLoginSuccess)
			.fail(this.onFailedLogin);
			
		},

		render: function() {

			var standardActions = [
				{ text: 'OK' }
			];

			return (
				<Paper zDepth={1} className="form-wrap">
				<Dialog ref="dialog" className="dialog login-dialog" title="Login Failed" actions={standardActions}>
	        	{this.state.error}
        </Dialog>
				<form  className="login" onSubmit={this.onSubmit} role="form">
					<h4>Please login...</h4>
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
		        <br/>
		        <Link to="register">Register</Link>
        </form>
	      </Paper>
			);
		},

		onLoginSuccess: function(user, textStatus) {
			console.log('LoginForm::onLoginSuccess() user: ', user);
			AuthActions.login(user);
		},

		onFailedLogin: function(jqXhr, textStatus, errorThrown) {
			console.log('LoginForm::onFailedLogin: jqXhr: ', jqXhr);
			this.setState({error: jqXhr.responseJSON.error});
			this.refs.dialog.show();
		},

	});

	module.exports = LoginForm;

}());