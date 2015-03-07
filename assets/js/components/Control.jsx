/**
 * Control
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');

	// React.
	var React = require('react');
	var Toolbar = require('./Toolbar.jsx');
	var ToolbarGroup = require('./ToolbarGroup.jsx');
	var PrimaryButton = require('./PrimaryButton.jsx');

	var Router = require('react-router');
	var Link = Router.Link;

	var Control = React.createClass({

		getInitialState: function () {
	    return {
	    	loggedIn: false
	    };
		},

		componentDidMount: function () {
		 	AuthStore.addLoginListener(this.onLogin);
		 	AuthStore.addLogoutListener(this.onLogout);
		},

		componentWillUnmount: function () {
			AuthStore.removeLoginListener(this.onLogin);
			AuthStore.removeLoginListener(this.onLogout);
		},

		logout: function() {
			console.log('Control::logout()');
			$.ajax({url: '/logout'})
				.done(function(data) {
					console.log(data);
					AuthActions.logout();
				})
				.fail(function(jqXhr) {
					console.log(jqXhr);
				});
		},

		render: function() {
			var authButton;

			console.log('Control::render() loggedIn:', this.state.loggedIn);

			if (this.state.loggedIn) {
				authButton = <PrimaryButton label="Logout" className="logout-btn" onClick={this.logout} />;
			} else {
				authButton = <PrimaryButton label="Login" linkButton={true} to="login" className="login-btn" />;
			}

			return(
				<Toolbar className="control col s12">
					<ToolbarGroup>
						{authButton}
					</ToolbarGroup>
				</Toolbar>
			);
		},

		onLogin: function() {
			console.log('Control::onLogin()');
			this.setState({loggedIn: true});
		},

		onLogout: function() {
			console.log('Control::onLogout()');
			this.setState({loggedIn: false});
		}

	});

	module.exports = Control;

}());