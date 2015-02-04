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

console.log('BookStore: ', BookStore);

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
    console.log(book);
    BookActions.create(book);
  },

  render: function() {
    return (
      <form  className="form-add-book" onSubmit={this.onSubmit} role="form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text"
                 name="title"
                 ref="title"
                 className="form-control"
                 placeholder="Enter a Title"
                 value={this.state.title}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="ISBN">ISBN:</label>
          <input type="text"
                 name="ISBN"
                 ref="ISBN"
                 className="form-control"
                 placeholder="Enter a valid ISBN"
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