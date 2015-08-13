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
var Discussion = require('./components/Discussion.jsx');
var UserDashboard = require('./components/UserDashboard.jsx');
var UserAccount = require('./components/UserAccount.jsx');
var SourceDashboard = require('./components/SourceDashboard.jsx');
var StartDiscussion = require('./components/StartDiscussion.jsx');

var Suggest = require('./components/Suggest.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<DefaultRoute name="home" handler={UserDashboard} />
  	<Route name="source" path="/source/:sourceId" handler={SourceDashboard} />
    <Route name="send-invite" path="/send-invite" handler={SendInvite} />
    <Route name="suggest" path="/suggest" handler={Suggest} />
    <Route name="discussion" path="/discussion/:discussionId" handler={Discussion} />
    <Route name="start-discussion" path="/start-discussion" handler={StartDiscussion} />
    <Route name="user-account" path="/account" handler={UserAccount} />
  </Route>
);

module.exports = routes;