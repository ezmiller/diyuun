/**
 * App
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');

	// React Cursor
	var Cursor = require('react-cursor').Cursor;

	// React & Components.
	var React = require('react');
	var Router = require('react-router');
	var Login = require('./Login.jsx');
	var Controlbar = require('./Controlbar.jsx');
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Classable = require('./mixins/classable.js');

	var App = React.createClass({

		mixins: [Classable, Router.State],

		contextTypes: {
	    router: React.PropTypes.func
	  },

		getInitialState: function () {
		    return {
		       loggedIn: false,
		       user: null
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
			var cursor = Cursor.build(this);

			console.log('App::render() logged in:', this.state.loggedIn);

			return !this.state.loggedIn ? (
				<div id="app" className="loading">
				</div>
			) : (
				<div id="app" className="logged-in">
					<div id="container">
						<header>
							<Controlbar user={cursor.refine('user')} />
						</header>
						<div className="content">
							<RouteHandler user={cursor.refine('user')} />
						</div>
					</div>
				</div>
			);

		},

		onLogin: function() {
			console.log('App::onLogin()');
			var path = this.getPathname() === '/login' ? '/' : this.getPathname();
			this.setState({loggedIn: true, user: AuthStore.getCurrentUser()});
			this.context.router.transitionTo(path);
		},

		onLogout: function() {
			console.log('App::onLogout()');
			this.setState({loggedIn: false, user: null});
			window.location.replace('/login');
		}

	});

	module.exports = App;

}());