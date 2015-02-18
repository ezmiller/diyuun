/**
 * RegisterForm
 */
(function() {
	'use strict';

	// Load React and necessary components.
	var React = require('react');
	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');
	var mui = require('material-ui');
	var TextField = mui.TextField;
	var Dialog = mui.Dialog;
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
			AuthStore.addFailedRegistrationListener(this._onFailedRegistration);
		},

		componentWillUnmount: function () {
			console.log('RegistrationForm::componentWillMount() called');
			AuthStore.removeFailedRegistrationListener(this._onFailedRegistration);
		},

		onSubmit: function(e) {
			console.log('RegistrationForm::onSubmit() called');
			var user = {};
			e.preventDefault();

			user.email = this.state.email.trim();
			user.username = user.email;
			user.password = this.state.password.trim();

			// this.register(user);
			AuthActions.register(user);
		},

		handleChange: function(e) {
			var newState = {};
		    newState[e.target.name] = e.target.value;
		    console.log('RegistrationForm::handleChange() newstate', newState);
		    this.setState(newState);
		},

		render: function() {

			var standardActions = [
				{ text: 'OK' }
			];

			return (
				<div>
					<Dialog ref="dialog" title="Registration Failed" actions={standardActions}>
	        	{this.state.error}
	        </Dialog>
					<form  className="login" onSubmit={this.onSubmit} role="form">
					<h4>Please register...</h4>
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
	        </div>
			);
		},

		_onFailedRegistration: function(jqXhr, responseJSON) {
			console.log('RegisterForm::_onFailedRegistration: ', jqXhr, responseJSON);
			this.setState({error: responseJSON.error});
			this.refs.dialog.show();
		}

	});

	module.exports = RegisterForm;

}());