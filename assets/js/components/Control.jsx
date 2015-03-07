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
	var Classable = require('./mixins/classable.js');

	var Router = require('react-router');
	var Link = Router.Link;

	var Control = React.createClass({

		mixins: [Classable],

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
			var rightToolBarGroup,
					menuItems;

			var labels = [
					'Send Invitation',
					'Logout'
			];

			if (this.state.loggedIn) {
				menuItems = labels.map(function(label,i) {
					return <li key={i}>{label}</li>
				});
				rightToolBarGroup = (
					<div>
					<ul id="user-dropdown" className="dropdown-content">
						{menuItems}
					</ul>
					<ToolbarGroup>
						<li>
						<a className="dropdown-button" href="#!" data-activates="user-dropdown">Menu<i className="mdi-navigation-arrow-drop-down right"></i></a>
						</li>
					</ToolbarGroup>
					</div>
				);
			} else {
				rightToolBarGroup = (
					<ToolbarGroup>
						<PrimaryButton label="Login" linkButton={true} to="login" className="login-btn" />
					</ToolbarGroup>
				);
			}

			var classes = this.getClasses('control col s12', {
				'logged-in': this.state.loggedIn
			});

			return(
				<Toolbar className={classes}>
					{rightToolBarGroup}
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