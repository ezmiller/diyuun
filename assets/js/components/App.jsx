'use strict';
/**
 * App
 */

// Load React.
var React = require('react');

// Load Router.
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

	render: function() {
		return (
			<div>
			<header>
				<Link to="login">Login</Link><br/>
				<Link to="register">Register</Link><br/>
				<Link to="add-book">Add Book</Link>
			</header>
    	<RouteHandler />
			</div>
		);
	}

});

module.exports = App;