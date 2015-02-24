/**
 * Control
 */
(function() {
	'use strict';

	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');

	var React = require('react');

	var mui = require('material-ui');
	var Toolbar = mui.Toolbar;
	var ToolbarGroup = mui.ToolbarGroup;
	var FlatButton = mui.FlatButton;


	var Router = require('react-router');
	var Link = Router.Link;

	var Control = React.createClass({

		getInitialState: function () {
	    return {
	    	loggedIn: AuthStore.isLoggedIn()
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
				authButton = <FlatButton className="logout-btn" label="Logout" onClick={this.logout} />;
			} else {
				authButton = <Link to="login" className="login-btn"><FlatButton label="Login" /></Link>;
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