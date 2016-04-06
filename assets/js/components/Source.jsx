/**
 * Source
 */
(function() {
  'use strict';

  var React = require('react');

  var Source = React.createClass({

    getDefaultProps: function () {
      return {
        source: null  
      };
    },

    handleClick: function(e) {
      e.preventDefault();
      publish('/app/transitionTo', ['/source/'+this.props.source.get('id')]);
    },

    render: function() {
      var source, authors;

      source = this.props.source;

      authors = !source ? null : source.get('authors').map(function(author,key) {
        return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
      });

      return(
        <article className="source" onClick={this.handleClick}>
          <div className="cover">
            <img className="image" src={source.get('imageLinks').thumbnail} alt="Book Cover" />
          </div>
          <div className="info">
            <div className="meta">
              <h3 className="title">{source.get('title')}</h3>
              <h5 className="subtitle">{source.get('subtitle')}</h5>
              <span className="authors">by {authors}</span>
            </div>
          </div>
        </article>
      );
    }

  });

  module.exports = Source;
}());