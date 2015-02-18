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
			AuthStore.addFailedLoginListener(this._onFailedLogin);
		},

		componentWillUnmount: function () {
			console.log('LoginForm::componentWillMount() called');
			AuthStore.removeFailedLoginListener(this._onFailedLogin);
		},

		onSubmit: function(e) {
			console.log('LoginForm::onSubmit() called');
			e.preventDefault();
			var user = {};
			user.identifier = this.state.identifier.trim();
			user.password = this.state.password.trim();
			// this.authenticate(user);
			AuthActions.login(user);
		},

		handleChange: function(e) {
			var newState = {};
		    newState[e.target.name] = e.target.value;
		    console.log('LoginForm::handleChange() newstate', newState);
		    this.setState(newState);
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

		_onFailedLogin: function(jqXhr, responseJSON) {
			console.log('LoginForm::_onFailedLogin: jqXhr: ', jqXhr, responseJSON);
			this.setState({error: responseJSON.error});
			this.refs.dialog.show();
		},

	});

	module.exports = LoginForm;

}());