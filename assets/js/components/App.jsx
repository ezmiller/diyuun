/**
 * App
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');

	// React & Components.
	var React = require('react');
	var Router = require('react-router');
	var Controlbar = require('./Controlbar.jsx');
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Navigation = require('react-router').Navigation;

	var App = React.createClass({

		mixins: [Navigation],

		getInitialState: function () {
		    return {
		       loggedIn: false,
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

		render: function() {
			return (
				<div id="container">
					<header>
						<Controlbar />
					</header>
					<RouteHandler />
				</div>
			);
		},

		onLogin: function() {
			console.log('Controlbar::onLogin()');
			this.setState({loggedIn: true});
			this.replaceWith('dashboard');
		},

		onLogout: function() {
			console.log('Controlbar::onLogout()');
			this.setState({loggedIn: false});
			this.replaceWith('login');
		}

	});

	module.exports = App;

}());