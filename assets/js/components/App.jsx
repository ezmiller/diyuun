/**
 * App
 */
(function() {
	'use strict';

	// Load React.
	var React = require('react');

	// Load Router.
	var Router = require('react-router');
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Control = require('./Control.jsx');

	var App = React.createClass({

		render: function() {
			return (
				<div>
					<header>
						<Control />
					</header>
					<div id="main">
		    		<RouteHandler />
		    	</div>
				</div>
			);
		}

	});

module.exports = App;

}());