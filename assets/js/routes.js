/**
 * Contains the front end "routes" for the react-router
 */

// Load React and React Router
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var SendInvite = require('./components/SendInvite.jsx');
import {UserDashboard} from './components/UserDashboard.jsx';

var Suggest = require('./components/Suggest.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<DefaultRoute name="home" handler={UserDashboard} />
    <Route name="send-invite" path="/send-invite" handler={SendInvite} />
    <Route name="suggest" path="/suggest" handler={Suggest} />
  </Route>
);

module.exports = routes;