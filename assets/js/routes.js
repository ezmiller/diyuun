/**
 * Contains the front end "routes" for the react-router
 */

// Load React and React Router
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/App.jsx');
var AddBook = require('./components/AddBook.jsx');
var Login = require('./components/Login.jsx');
var Register = require('./components/Register.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<Route name="login" handler={Login} />
    <Route name="register" handler={Register} />
    <Route name="add-book" handler={AddBook} />
  </Route>
);

module.exports = routes;