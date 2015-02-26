/**
 * LoginForm
 * @jsx React.DOM
 */
(function() {
	'use strict';


	// Flux.
	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');

	// Router
	var Router = require('react-router');
	var Link = Router.Link;

	// Load React and necessary components.
	var React = require('react');
	var Classable = require('./mixins/classable.js');
	var Input = require('./Input.jsx');
	var PrimaryButton = require('./PrimaryButton.jsx');

	var Dialog = require('./Dialog.jsx');

	var LoginForm = React.createClass({

		mixins: [Classable],

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

			var gridClasses =this.getClasses('col s4 offset-s4', {});
			var wrapClasses = this.getClasses('login form-wrap z-depth-1', {});

			return (
				<div className={gridClasses}>
					<div className={wrapClasses}>
						<Dialog ref="dialog" className="dialog login-dialog" title="Login Failed" actions={standardActions}>
			        	{this.state.error}
		        </Dialog>
						<form className="login-form" onSubmit={this.onSubmit} role="form">
							<h4>Please login...</h4>
							<div>
				      	<Input
				      		label="Email"
				       	  type="email"
				          name="identifier"
				          ref="identifier"
				          onChange={this.handleChange} />
				        </div>
				        <div>
				        	<Input
				        		label="Password"
					        	type="text"
					          name="password"
					          ref="password"
					          onChange={this.handleChange} />
				        </div>
				        <br/>
				        <PrimaryButton label="Login" />
				        <br/>
				        <Link to="register">Register</Link>
		        </form>
		      </div>
		    </div>
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