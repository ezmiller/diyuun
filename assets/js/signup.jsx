'use strict';
/**
 * signup.jsx
 */

var React = require('react');
var Router = require('react-router');

var routes = (
	<Route path="/signup" handler={Signup} />
);

Router.run(routes, Router.HistoryLocation, function(Handler,state) {
  React.render(
  	<Handler />,
  	document.getElementById('container')
  );
});