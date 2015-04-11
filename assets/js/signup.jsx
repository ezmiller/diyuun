'use strict';
/**
 * signup.jsx
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Signup = require('./components/Signup.jsx');

var routes = (
	<Route name="join" path="/join/:token" handler={Signup} />
);

Router.run(routes, Router.HistoryLocation, function(Handler,state) {
  React.render(
  	<Handler />,
  	document.getElementById('app-body')
  );
});