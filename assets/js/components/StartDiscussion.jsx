/**
 * StartDiscussion
 */
/*jslint browser:true*/
(function() {
  'use strict';

  var React = require('react');
  var Cursor = require('react-cursor');
  var Actions = require('../actions/Actions.js');
  var DiscussionStore = require('../stores/DiscussionStore.js');

  var StartDiscussion = React.createClass({

    propTypes: {
      user: React.PropTypes.instanceOf(Cursor).isRequired
    },

    getInitialState: function () {
      return {
        title: '',
        prompt: '',
        private: true,
        visible: false  
      };
    },

    componentDidMount: function () {
      DiscussionStore.addEventListener('sync', this.onSync);
      DiscussionStore.addEventListener('error', this.onSyncError);
    },

    componentWillUnmount: function () {
      DiscussionStore.removeEventListener('error', this.onSync);
      DiscussionStore.removeEventListener('error', this.onSyncError);
    },

    handleSubmit: function(e) {
      var data;

      e.preventDefault();

      data = this.state;
      data.owner = this.props.user.value.id;
      console.log('submitting new discussion: ', data);

      Actions.createDiscussion(data);

    },

    handleChange: function(e) {
      var target, nextState = {};
      target = e.target.name; 
      nextState[target] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      this.setState(nextState);
    },

    render: function() {
      return (
        <div className="start-discussion eight columns offset-by-two">
          <div className="form-wrap">
            <form id="start-discussion" onSubmit={this.handleSubmit}>
              <h4>Start a Discussion</h4>
              <div>
                <input 
                  type="text" name="title" 
                  placeholder="Discussion Title" 
                  onChange={this.handleChange} 
                  value={this.state.title} />
              </div>
              <div>
                <input 
                  type="text" 
                  name="prompt" 
                  placeholder="Topic or Prompt" 
                  onChange={this.handleChange} 
                  value={this.state.prompt} />
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="private" 
                  name="private" 
                  onChange={this.handleChange} 
                  checked={this.state.private} />
                <label htmlFor="private">Private Discussion</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="visible" 
                  name="visible" 
                  onChange={this.handleChange} 
                  checked={this.state.visible} />
                <label htmlFor="visible">Visible to Public  </label>
              </div>
              <button id="cancel" name="cancel">Cancel</button>
              <button id="start" name="start">Start</button>
            </form>
          </div>
        </div>
      );
    },

    onSync: function(discussion) {
      console.log('StartDiscussion::onSync() called:', discussion);
    },

    onSyncError: function(err) {
      console.log('StartDiscussion::onSyncError() called:', error);
    }

  });

  module.exports = StartDiscussion;

}());