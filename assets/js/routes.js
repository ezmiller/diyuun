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
var SendInvite = require('./components/SendInvite.jsx');
// var UserDashboard = require('./components/UserDashboard.jsx');
import {UserDashboard} from './components/UserDashboard.jsx';

console.log('here');

console.log(UserDashboard);
var Suggest = require('./components/Suggest.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<DefaultRoute name="home" handler={UserDashboard} />
    <Route name="login" path="/login" handler={Login} />
    <Route name="send-invite" path="/send-invite" handler={SendInvite} />
    <Route name="suggest" path="/suggest" handler={Suggest} />
  </Route>
);

module.exports = routes;