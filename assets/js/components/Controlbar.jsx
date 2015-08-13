/**
 * Controlbar
 */
(function() {
	'use strict';

	var $ = require('jquery');
	var classNames = require('classnames');

	// Flux.
	var AuthStore = require('../stores/AuthStore.js');
	var Actions = require('../actions/Actions.js');

	// React & Components.
	var React = require('react');
	var PrimaryButton = require('./PrimaryButton.jsx');
	var Router = require('react-router');
	var Link = Router.Link;

	var Controlbar = React.createClass({

		propType: {
			user: React.PropTypes.object.isRequired
		},

		getInitialState: function () {
		  return {
		    'dropMenuVisible': false  
		  };
		},

		handleMenuClick: function(e) {
			this.setState({dropMenuVisible: false});
		},

		handleDropMenuToggle: function(e) {
			e.preventDefault();
			this.setState({dropMenuVisible: !this.state.dropMenuVisible});
		},

		logout: function(e) {
			e.preventDefault();
			this.setState({dropMenuVisible: false});
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
			var isVisible = this.state.dropMenuVisible;;

			return (
				<nav id="controlbar">
					<div className="controlbar-wrapper">
						<a href="#" className="brand-logo">Kanon</a>
						<ul className="right-controlbar-group">
							<li className="dropdown">
								<a className="dropdown-toggle" onClick={this.handleDropMenuToggle} >
									<div className="avatar-wrap">
										<img className="avatar" src={this.props.user.refine('avatar').value + '?timestamp=' + Date.now()} />
									</div>
									<span className="user">{this.props.user.refine('firstName').value}</span>
									<i className="fa fa-chevron-down"></i>
								</a>
								<ul className={classNames('dropdown-menu', {'visible': isVisible})}>
									<li className="menu-item" key="account"><Link onClick={this.handleMenuClick} to="user-account">Account</Link></li>
									<li className="menu-item" key="send-invite"><Link onClick={this.handleMenuClick} to="send-invite">Send Invite</Link></li>
									<li className="menu-item" key="suggest-source"><Link onClick={this.handleMenuClick} to="suggest">Suggest a Book</Link></li>
									<li className="menu-item" key="logout"><a href="logout" onClick={this.logout}>Logout</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div onClick={this.handleDropMenuToggle} className={classNames('offclick-layer', {'visible': isVisible})}></div>
				</nav>
			);
		},

	});

	module.exports = Controlbar;

}());