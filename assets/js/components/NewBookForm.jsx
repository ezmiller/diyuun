'use strict';
/**
 * NewBookForm
 */

define(
[
  'react',
  'actions/BookActions',
  'stores/BookStore'
],
function(React, BookActions, BookStore) {

var NewBookForm = React.createClass({

  getInitialState: function() {
    return {title: '', ISBN: ''};
  },

  componentDidMount: function () {
    console.log('NewBookForm: add change listener.');
    BookStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    console.log('NewBookForm: remove change listener');
    BookStore.removeChangeListener(this._onChange);
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
    book.ISBN = this.state.ISBN.trim();
    BookActions.create(book);
  },

  render: function() {
    return (
      <form  className="form-add-book" onSubmit={this.onSubmit} role="form">
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text"
                 name="title"
                 ref="title"
                 className="validate"
                 value={this.state.title}
                 onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="ISBN">ISBN:</label>
          <input type="text"
                 name="ISBN"
                 ref="ISBN"
                 className="validate"
                 value={this.state.ISBN}
                 onChange={this.handleChange} />
        </div>
        <input type="submit" value="Submit" className="btn btn-default"/>
        <input type="hidden" name="_csrf" ref="_csrf" value="<%= _csrf %>" />
     </form>
    );
  },

  _onChange: function() {
    console.log('NewBookForm:  There was a change');
  }

}); //NewBookForm

return NewBookForm;

}); //define