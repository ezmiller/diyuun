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
	var Login = require('./Login.jsx');
	var Controlbar = require('./Controlbar.jsx');
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Classable = require('./mixins/classable.js');

	var App = React.createClass({

		mixins: [Classable],

		contextTypes: {
	    router: React.PropTypes.func
	  },

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

			var classes = this.getClasses('', {
				'not-logged-in': !this.state.loggedIn,
				'logged-in': this.state.loggedIn
			});

			console.log('App::render() logged in:', this.state.loggedIn);

			var container = (!this.state.loggedIn) ? (
				<div id="container">
					<Login />
				</div>
			) : (
				<div id="container">
					<header>
						<Controlbar />
					</header>
					<div className="content">
						<RouteHandler />
					</div>
				</div>
			);

			return (
				<div id="app" className={classes}>
					{container}
				</div>
			);

		},

		onLogin: function() {
			console.log('App::onLogin()');
			this.setState({loggedIn: true});
		},

		onLogout: function() {
			console.log('App::onLogout()');
			this.setState({loggedIn: false});
		}

	});

	module.exports = App;

}());