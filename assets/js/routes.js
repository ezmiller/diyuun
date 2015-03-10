/**
 * Contains the front end "routes" for the react-router
 */

// Load React and React Router
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');
var Login = require('./components/Login.jsx');
var Signup = require('./components/Signup.jsx');
var Register = require('./components/Register.jsx');
var Dashboard = require('./components/Dashboard.jsx');
var SendInvite = require('./components/SendInvite.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<DefaultRoute handler={Login} />
  	<Route name="login" handler={Login} />
  	<Route name="signup" handler={Signup} />
    <Route name="register" handler={Register} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="send-invite" handler={SendInvite} />
  </Route>
);

module.exports = routes;