/**
 * LoginForm
 * @jsx React.DOM
 */
(function() {
  'use strict';

  var $ = require('jquery');

  // Flux.
  var AuthStore = require('../stores/AuthStore.js');
  var AuthActions = require('../actions/AuthActions.js');

  // Router
  var Router = require('react-router');
  var Link = Router.Link;

  // Load React and necessary components.
  var React = require('react');
  var Classable = require('./mixins/classable.js');
  var PrimaryButton = require('./PrimaryButton.jsx');

  var Dialog = require('./Dialog.jsx');

  var LoginForm = React.createClass({

    mixins: [Classable],

    getInitialState: function () {
        return {
            error: '',
            identfier: '',
            password: ''
        };
    },

    componentDidMount: function () {
      console.log('LoginForm::componentDidMount() called');
    },

    componentWillUnmount: function () {
      console.log('LoginForm::componentWillMount() called');
    },

    handleChange: function(e) {
      var newState = {};
       newState[e.target.name] = e.target.value;
       this.setState(newState);
    },

    onSubmit: function(e) {
      e.preventDefault();
      var user = {};
      user.identifier = this.state.identifier.trim();
      user.password = this.state.password.trim();
      this.login(user);
    },

    login: function(user) {
      var that = this;
      console.log('LoginForm::login() called with user: ', user);

      // Make Ajax call to authentication endpoint.
      $.ajax({
        type: 'POST',
        url: '/auth/local',
        data: user
      })
      .done(this.onLoginSuccess)
      .fail(this.onFailedLogin);
    },

    render: function() {

      return (
        <div className="login form-wrap">
          <h1>Kanon</h1>
          <form className="login-form" onSubmit={this.onSubmit} role="form">
            <h4>Please login...</h4>
            <span className="error-msg">
              {this.state.error}
            </span>
            <div>
              <input
                type="email"
                name="identifier"
                ref="identifier"
                placeholder="email"
                onChange={this.handleChange} />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  ref="password"
                  placeholder="password"
                  onChange={this.handleChange} />
              </div>
              <br/>
              <PrimaryButton label="Login" />
          </form>
        </div>
      );
    },

    onLoginSuccess: function(user, textStatus) {
      console.log('LoginForm::onLoginSuccess() user: ', user);
      AuthActions.login(user);
    },

    onFailedLogin: function(jqXhr, textStatus, errorThrown) {
      console.log('LoginForm::onFailedLogin: jqXhr: ', jqXhr);
      this.setState({error: jqXhr.responseJSON.error});
    },

  });

  module.exports = LoginForm;

}());