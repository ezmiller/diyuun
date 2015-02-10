'use strict';
/**
 * NewBookForm
 */

// Load Flux componenets
var BookActions = require('../actions/BookActions.js');
var ErrorActions = require('../actions/ErrorActions.js');
var BookStore = require('../stores/BookStore.js');
var _ = require('underscore');

// Load React components
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var NewBookForm = React.createClass({

  getInitialState: function() {
    return {title: '', author: '', ISBN: ''};
  },

  componentDidMount: function () {
    console.log('NewBookForm: add change & error listener.');
    console.log(BookStore);
    BookStore.addChangeListener(this._onChange);
    BookStore.addErrorListener(this._onError);
  },

  componentWillUnmount: function () {
    console.log('NewBookForm: remove change & error listener');
    BookStore.removeChangeListener(this._onChange);
    BookStore.removeErrorListener(this._onError);
  },

  handleChange: function() {
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  },

  onSubmit: function(e) {
    e.preventDefault();
    var book = {};
    book.title = this.state.title.trim();
    book.author = this.state.author.trim();
    book.ISBN = this.state.ISBN.trim();
    BookActions.create(book);
  },

  render: function() {
    return (
      <form  className="form-add-book" onSubmit={this.onSubmit} role="form">
        <div>
        <TextField
          name="title"
          ref="title"
          hintText="Title"
          floatingLabelText="Title"
          onChange={this.handleChange} />
        </div>
        <div>
        <TextField
          name="author"
          ref="author"
          hintText="Author"
          floatingLabelText="Author"
          onChange={this.handleChange} />
        </div>
        <div>
        <TextField
          name="ISBN"
          ref="ISBN"
          hintText="ISBN"
          floatingLabelText="ISBN"
          onChange={this.handleChange} />
        </div>
        <div>
        <TextField
          name="blurb"
          ref="blurb"
          hintText="Description"
          floatingLabelText="Description"
          multiLine={true}
          onChange={this.handleChange} />
        </div>
        <br/>
        <RaisedButton label="Submit" />
        <input type="hidden" name="_csrf" ref="_csrf" value="<%= _csrf %>" />
     </form>
    );
  },

  _onChange: function() {
    console.log('NewBookForm:  There was a change');
  },

  _onError: function(model, resp, options) {
    var err = ( resp.responseJSON && resp.responseJSON.err ) ? resp.responseJSON.err : null;
    var fields = this.refs;

    console.log('NewBookForm::_onError()  sending err', err);

    _.map(this.refs, function(value,key) {
      if (key !== '_csrf')
        fields[key].setErrorText('');
    });

    _.map(err.invalidAttributes, function(value, key) {
      fields[key].setErrorText('Invalid ' + key);
    });
  }

}); //NewBookForm

module.exports = NewBookForm;