/**
 * SearchResult
 */
(function() {
	'use strict';

  var React = require('react');
  var classNames = require('classnames');

  var SearchResult = React.createClass({

    getDefaultProps: function () {
      return {
      	resultsBtnLabel: 'Label Not Defined'      
      };
    },

    handleClick: function(e) {
    	e.preventDefault();
    	this.props.handler(this.props.data);
    },

    render: function() {
    	var authors, source, classes;

			source = this.props.data;

    	authors = source.authors.map(function(author,key) {
    		return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
    	});

      classes = classNames('item', 'search-result', this.props.className);

    	return (
    		<li key={source.id} className={classes}>
    			<div className="cover">
    				<img className="image" src={source.imageLinks ? source.imageLinks.thumbnail : 'images/book-icon.svg'} alt="Book Cover" />
    			</div>
    			<div className="metadata">
    				<h3 className="title">{source.title}</h3>
    				<h4 className="subtitle">{source.subtitle}</h4>
    				<p className="authors">{authors}</p>
    			</div>
    			<button onClick={this.handleClick}>{this.props.resultsBtnLabel}</button>
    		</li>
    	);
    }

  });

  module.exports = SearchResult;

}());

