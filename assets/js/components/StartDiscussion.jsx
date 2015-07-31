/**
 * StartDiscussion
 */
/*jslint browser:true*/
(function() {
  'use strict';

  var React = require('react');
  var Search = require('./Search.jsx');
  var SearchResult = require('./SearchResult.jsx');

  var Cursor = require('react-cursor').Cursor;
  var ImmutableOptimizations = require('react-cursor').ImmutableOptimizations;
  
  var Actions = require('../actions/Actions.js');
  var DiscussionStore = require('../stores/DiscussionStore.js');

  var _ = require('underscore');

  var SourceSelector = React.createClass({

    propTypes: {
      selected: React.PropTypes.instanceOf(Cursor).isRequired
    },

    getDefaultProps: function () {
      return {
        selected: null  
      };
    },

    getInitialState: function () {
      return {
        addingSource: false  
      };
    },

    handleAddSourceClick: function() {
      this.setState({addingSource: true});
    },

    handleRemoveSourceClick: function(source) {
      var newSelected;
      
      newSelected = this.props.selected.value.filter(function(v) {
        return v.id !== source.id;
      });

      if (newSelected.length === 0) newSelected = [];

      this.props.selected.set(newSelected);
    },

    handleSearchFormClick: function(source) {
      this.props.selected.push(Array(source));
      this.setState({addingSource: false});
    },

    searchResultsFilter: function(source) {
      var found = _.find(this.props.selected.value, function(v) {
        return v.id === source.id;
      });
      return found === undefined;
    },

    render: function() {
      var selected, selectedSourceItems;

      selected = this.props.selected.value;

      selectedSourceItems = selected !== null && selected.length > 0 ? selected.map(function(item, i) {
        return <SearchResult 
                  key={i} 
                  data={item} 
                  className="selected"
                  handler={this.handleRemoveSourceClick} 
                  resultsBtnLabel="Remove" />;
      }.bind(this)) : null;

      return (
        <div className="source-selector">
          <Search 
            placeholder="Add a Source" 
            resultsBtnLabel="Add"
            handler={this.handleSearchFormClick} 
            showAtTop={selectedSourceItems} 
            resultsFilterFunc={this.searchResultsFilter} />
        </div>
      );
    }

  });

  var StartDiscussion = React.createClass({

    propTypes: {
      user: React.PropTypes.instanceOf(Cursor).isRequired
    },

    getInitialState: function () {
      return {
        title: '',
        prompt: '',
        isPrivate: true,
        isVisible: false,
        sources: []
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
      var cursor = Cursor.build(this);

      return (
        <div className="start-discussion eight columns">
          <div className="form-wrap">
            <form id="start-discussion" onSubmit={this.handleSubmit}>
              <h3>Start a Discussion</h3>
              <div className="title-field-wrap">
                <input 
                  type="text" name="title" 
                  placeholder="Discussion Title" 
                  onChange={this.handleChange} 
                  value={this.state.title} />
              </div>
              <div className="prompt-field-wrap">
                <textarea 
                  type="text" 
                  name="prompt" 
                  placeholder="Topic or Prompt" 
                  onChange={this.handleChange}>{this.state.prompt}</textarea>
              </div>
              <div className="source-selector-field-wrap">
                <SourceSelector selected={cursor.refine('sources')} />
              </div>
              <div className="buttons-wrap">
                <button id="cancel" className="button flat" name="cancel">Cancel</button>
                <button id="start" name="start">Start</button>
              </div>
            </form>
          </div>
        </div>
      );
    },

    onSync: function(discussion) {
      console.log('StartDiscussion::onSync() called:', discussion);
      publish('/app/transitionTo', ['/discussion/'+discussion.collection.models[0].get('id')]);
    },

    onSyncError: function(err) {
      console.log('StartDiscussion::onSyncError() called:', error);
    }

  });

  module.exports = StartDiscussion;

}());