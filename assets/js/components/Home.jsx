/**
 * Home
 */
(function() {
	'use strict';

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');

	// React & Components
	var React = require('react');
	var Section = require('./Section.jsx');
	var Control = require('./Control.jsx');
	var Dashboard = require('./Dashboard.jsx');
	var RequestInvitation = require('./RequestInvitation.jsx');

	var Home = React.createClass({

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
			var homeBody;

			if (this.state.loggedIn) {
				homeBody = <Dashboard />;
			} else {
				homeBody = <Section className="above-fold"><RequestInvitation /></Section>;
			}

			return (
				<div className="home">
					<header>
						<Control />
					</header>
					<div id="main">
						{homeBody}
					</div>
				</div>
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

	module.exports = Home;

}());