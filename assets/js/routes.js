/**
 * Contains the front end "routes" for the react-router
 */

// Load React and React Router
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var Login = require('./components/Login.jsx');
var Dashboard = require('./components/Dashboard.jsx');
var SendInvite = require('./components/SendInvite.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<DefaultRoute name="home" handler={Dashboard} />
    <Route name="login" path="/login" handler={Login} />
    <Route name="send-invite" path="/send-invite" handler={SendInvite} />
  </Route>
);

module.exports = routes;