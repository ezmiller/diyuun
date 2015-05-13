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

		propType: {
			cursor: React.PropTypes.object.isRequired
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
							<li><Link to="send-invite">Send Invite</Link></li>
							<li><a href="logout" onClick={this.logout}>Logout</a></li>
							<li key="profile-link"><a className="profile-link" href="">{this.props.user.refine('firstName').value}</a></li>
						</ul>
					</div>
				</nav>
			);
		},

	});

	module.exports = Controlbar;

}());