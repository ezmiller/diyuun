/**
 * RegisterForm
 */
(function() {
  'use strict';

  // Load React and necessary components.
  var React = require('react');
  var AuthStore = require('../stores/AuthStore.js');
  var AuthActions = require('../actions/AuthActions.js');
  var mui = require('material-ui');
  var Paper = mui.Paper;
  var TextField = mui.TextField;
  var Dialog = mui.Dialog;
  var RaisedButton = mui.RaisedButton;

  var RegisterForm = React.createClass({

    getInitialState: function () {
        return {
            username: '',
            password: ''
        };
    },

    componentDidMount: function () {
      console.log('RegistrationForm::componentDidMount() called');
    },

    componentWillUnmount: function () {
      console.log('RegistrationForm::componentWillMount() called');
    },

    onSubmit: function(e) {
      console.log('RegistrationForm::onSubmit() called');
      var user = {};
      e.preventDefault();

      user.email = this.state.email.trim();
      user.username = user.email;
      user.password = this.state.password.trim();

      this.register(user);
    },

    handleChange: function(e) {
      var newState = {};
        newState[e.target.name] = e.target.value;
        console.log('RegistrationForm::handleChange() newstate', newState);
        this.setState(newState);
    },

    register: function(user) {
      var self = this;

      console.log('UserStore::register() called.');

      // Make Ajax call to authentication endpoint.
      $.ajax({
        type: 'POST',
        url: '/auth/local/register',
        data: user
      })
      .done(this.onRegistrationSuccess)
      .fail(this.onFailedRegistration);
    },

    render: function() {

      var dialogTitle = '';

      var standardActions = [
        { text: 'OK' }
      ];

      return (
        <Paper zDepth={1} className="form-wrap">
          <Dialog ref="successDialog" clasName="dialog register-dialog" title="Success" actions={standardActions}>
            {this.state.error}
          </Dialog>
          <Dialog ref="errDialog" clasName="dialog register-dialog" title="Registration Failed" actions={standardActions}>
            {this.state.error}
          </Dialog>
          <form  className="login" onSubmit={this.onSubmit} role="form">
          <h4>Please register...</h4>
          <div>
            <TextField
              type="email"
              name="email"
              ref="email"
              required="required"
              hintText="Email"
              floatingLabelText="Email"
              onChange={this.handleChange} />
            </div>
            <div>
              <TextField
              name="password"
              ref="password"
              required="required"
              hintText="Password"
              floatingLabelText="Password" 
              onChange={this.handleChange} />
            </div>
            <br/>
            <RaisedButton label="Register" />
            </form>
          </Paper>
      );
    },

    onRegistrationSuccess: function(user) {
      console.log('RegistrationForm::onRegistrationSuccess(): ', user);
      this.setState({error: JSON.stringify(user)});
      // this.refs.successDialog.show();
      AuthActions.login(user);
    },

    onFailedRegistration: function(jqXhr, responseJSON) {
      console.log('RegisterForm::onFailedRegistration(): ', jqXhr, responseJSON);
      this.setState({error: responseJSON.error});
      this.refs.errDialog.show();
    }

  });

  module.exports = RegisterForm;

}());