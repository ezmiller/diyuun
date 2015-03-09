/**
 * Controlbar
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');
	var AuthActions = require('../actions/AuthActions.js');

	// React & Components.
	var React = require('react');
	var PrimaryButton = require('./PrimaryButton.jsx');
	var Router = require('react-router');
	var Link = Router.Link;

	var Controlbar = React.createClass({

		getInitialState: function() {
			return {
				loggedIn: false
			}
		},

		componentDidMount: function () {
		 	AuthStore.addLoginListener(this.onLogin);
		 	AuthStore.addLogoutListener(this.onLogout);
		},

		componentWillUnmount: function () {
			AuthStore.removeLoginListener(this.onLogin);
			AuthStore.removeLoginListener(this.onLogout);
		},

		logout: function(e) {
			e.preventDefault();
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
			return (
				<nav id="controlbar" class="">
					<div className="controlbar-wrapper">
						<a href="#" className="brand-logo">Kanon</a>
						<ul className="right-controlbar-group">
							<li><a href="logout" onClick={this.logout}>Logout</a></li>
						</ul>
					</div>
				</nav>
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

	module.exports = Controlbar;

}());