'use strict';
/**
 * signup.jsx
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Login = require('./components/Login.jsx');

var routes = (
	<Route name="login" path="/login" handler={Login} />
);

Router.run(routes, Router.HistoryLocation, function(Handler,state) {
  React.render(
  	<Handler />,
  	document.getElementById('app-body')
  );
});