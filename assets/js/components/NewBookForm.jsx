'use strict';
/**
 * NewBookForm
 */

define(
[
  'react',
  'actions/BookActions',
  'actions/ErrorActions',
  'stores/BookStore'
],
function(React, BookActions, ErrorActions, BookStore) {

var NewBookForm = React.createClass({

  getInitialState: function() {
    return {title: '', ISBN: ''};
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
          <label htmlFor="ISBN">ISBN</label>
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
  },

  _onError: function(model, resp, options) {
    var err = ( resp.responseJSON && resp.responseJSON.err ) ? resp.responseJSON.err : null;
    console.log('NewBookForm::_onError()  sending err.');
    ErrorActions.display(err);
  }

}); //NewBookForm

return NewBookForm;

}); //define