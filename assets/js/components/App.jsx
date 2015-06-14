/**
 * App
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');
	var SourceStore = require('../stores/SourceStore.js');
	var Actions = require('../actions/Actions.js');

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
	var Navigation = Router.Navigation;
	var Classable = require('./mixins/classable.js');

	var App = React.createClass({

		mixins: [Classable, Router.State, Navigation],

		contextTypes: {
	    router: React.PropTypes.func
	  },

		getInitialState: function () {
	    return {
	       loggedIn: false,
	       user: null,
	       sources: null
	    };
		},

		componentDidMount: function () {
		 	AuthStore.addLoginListener(this.onLogin);
		 	AuthStore.addLogoutListener(this.onLogout);
		 	SourceStore.addUpdateListener(this.onSourcesUpdate);
		 	SourceStore.addResetListener(this.onSourcesUpdate);

		 	// Catch navigation actions using minpubsub.
		 	subscribe('/app/transitionTo', this.navigate);

		 	if (this.getParams().sourceId) {
		 		Actions.getSource(this.getParams().sourceId);
		 	}

		},

		componentWillUnmount: function () {
			AuthStore.removeLoginListener(this.onLogin);
			AuthStore.removeLoginListener(this.onLogout);
			SourceStore.removeUpdateListener(this.onSourcesUpdate);
			SourceStore.removeResetListener(this.onSourcesUpdate);
		},

		navigate: function(path, params, query) {
			this.context.router.transitionTo(path, params, query);
			console.log(this.context.router.getCurrentPathname());
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
							<RouteHandler user={cursor.refine('user')} sources={cursor.refine('sources')} />
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
		},
	
		onSourcesUpdate: function(update) {
			console.log('App::onSourcesUpdate(): ', update);
			this.setState({sources: update});
		},

		onTransitionComplete: function() {
			console.log('done');
		}

	});

	module.exports = App;

}());