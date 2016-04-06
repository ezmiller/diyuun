/**
 * Register
 */
(function() {

  var $ = require('jquery');
  var _ = require('underscore');

  var React = require('react');
  var ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
  var State = require('react-router').State;

  var Register = React.createClass({

    mixins: [ImmutableOptimizations(['pendingUser', 'newUser'])],

    getInitialState: function () {
        return {
            password: ''
        };
    },

    handleChange: function(e) {
      var target = e.target.name,
          nextValue = e.target.value;
      if ( e.target.name === 'password') {
        this.setState({password: nextValue});
      } else {
        this.props.pendingUser.refine(target).set(nextValue);
      }
    },

    handleSubmit: function(e) {
      var name,
          user = _.clone(this.props.pendingUser.value);

      e.preventDefault();

      // Prepare pending user for registration.
      name = user.name.split(' ');
      user.firstName = name[0];
      user.lastName = name[1];
      user.email = user.email.trim();
      user.username = user.email;
      user.password = this.state.password.trim();
      user.title = user.title.trim();
      user.affiliation = user.affiliation.trim();

      // Now register the user.
      this.register(user);
    },

    register: function(user) {
      var self = this;

      // Make Ajax call to authentication endpoint.
      $.ajax({
        type: 'POST',
        url: '/auth/local/register',
        data: user
      })
      .done(function(data) {
        self.props.newUser.set(data);
      })
      .fail(function(jqXhr) {
        console.log('failed to register');
      });
    },

    render: function() {
      // console.log('Register function is rendering, state is: ', this.props.cursor.refine('pendingUser'));
      return (
        <form className="user-signup-form" onSubmit={this.handleSubmit}>
          <div>
          <input
            type="text"
            name="name"
            ref="name"
            placeholder="Name"
            value={this.props.pendingUser.refine('name').value}
            onChange={this.handleChange} />
          </div>
          <div>
          <input
            type="email"
            name="email"
            ref="email"
            placeholder="Email"
            value={this.props.pendingUser.refine('email').value}
            onChange={this.handleChange} />
          </div>
          <div>
          <input
            type="text"
            name="title"
            ref="title"
            placeholder="Title/Role"
            value={this.props.pendingUser.refine('title').value}
            onChange={this.handleChange}/>
          </div>
          <div>
          <input
            type="text"
            name="affiliation"
            ref="affiliation"
            placeholder="Affiliation"
            value={this.props.pendingUser.refine('affiliation').value}
            onChange={this.handleChange}/>
          </div>
          <div>
          <input
            type="password"
            name="password"
            ref="password"
            placeholder="Password"
            onChange={this.handleChange}/>
          </div>
          <br/>
          <input type="submit" value="Sign Up" />
        </form>
      );
    }
  });

  module.exports = Register;

}());


