/**
 * App
 */
(function() {
	'use strict';

	var React = require('react');
	var Router = require('react-router');
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;

	var App = React.createClass({

		render: function() {
			return (
				<div id="container">
					<RouteHandler />
				</div>
			);
		}

	});

	module.exports = App;

}());