/**
 * SendInvite
 *
 * TODO: Handle case in which the user is already in system.
 * 
 */
(function() {
  'use strict';

  var $ = require('jquery');

  // React & Components
  var React = require('react');

  // Mixins.
  var Classable = require('./mixins/classable.js');

  var SendInvite = React.createClass({

    mixins: [Classable],

    getInitialState: function () {
      return {
        'name': '',
        'email': '',
        'title': '',
        'affiliation': '',
        'message-recipient': '',
        'message': '',
        'joinLink': null
      };
    },

    handleChange: function(e) {
      var newState = {};
      newState[e.target.name] = e.target.value;
      console.log('SendInvite::handleChange() newstate', newState);
      this.setState(newState);
    },

    inviteeFormSubmit: function(e) {
      e.preventDefault();
      var user = {};
      user.name = this.state.name.trim();      
      user.email = this.state.email.trim();
      this.getJoinLink(user)
    },

    getJoinLink: function(newPendingUser) {
      var self = this;
      $.ajax({
        method: 'POST',
        url: '/invite',
        contentType: 'application/json',
        data: JSON.stringify(newPendingUser),
      })
      .done(function(data) {
        console.log('SendInvite::getJoinLink() success: ', data);
        self.setState(data);
      })
      .fail(function(jqXhr) {
        console.log('SendInvite::getJoinLink() err: ', jqXhr);
      });
    },

    render: function() {

      var defaultMessageText = "I would like to invite you to Kanon, a collaborative space for academics to discuss scholarship and ideas.",
          gridClasses = this.getClasses('column two-thirds offset-by-two', {}),
          wrapClasses = this.getClasses('send-invite form-wrap z-depth-1', {}),
          form;

      if (!this.state.joinLink) {
        form = (
          <div className={wrapClasses}>
            <h3>Invite a colleague to Kanon...</h3>
            <h5>Who would you like to invite?</h5>
            <form className="send-invite-form" role="form" onSubmit={this.inviteeFormSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  ref="name"
                  placeholder="Full Name" 
                  onChange={this.handleChange} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  ref="email"
                  placeholder="Email" 
                  onChange={this.handleChange} />
              </div>
              <input type="submit" value="Next" />
            </form>
          </div>
        );
      } else {
        form = (
          <div className={wrapClasses}>
            <h3>Invite a colleague to Kanon...</h3>
            <h5>Okay, Thank you!</h5>            
            <span>If you would like to invite {this.state.name} yourself, send along the link below. Otherwise, we can send an email on your behalf and we'll send an email for you.</span>
            <div className="link-wrap">
              <code className="link">{this.state.joinLink}</code>
            </div>

          </div>
        );
      }

      return (
        <section className="above-fold">
          <div className={gridClasses}>
            {form}
          </div>
        </section>
      );
    }
  });

  module.exports = SendInvite;


}());