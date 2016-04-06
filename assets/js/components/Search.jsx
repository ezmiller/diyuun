/**
 * Search
 */
(function() {
  'use strict';

  var $ = require('jquery');
  var moment = require('moment');

  var React = require('react');
  var SearchResult = require('./SearchResult.jsx');

  var Search = React.createClass({

    propTypes: {
      resultsBtnLabel: React.PropTypes.string.isRequired,
      handler: React.PropTypes.func.isRequired,
      showSelected: React.PropTypes.array,
      placeholder: React.PropTypes.string.isRequired,
      resultsFilterFunc: React.PropTypes.func
    },

    getDefaultProps: function () {
      return {
        resultsBtnLabel: 'Label Not Defined',
        handler: null,
        showAtTop: []
      };
    },

    getInitialState: function () {
      return {
        searchValue: '',
        searchResults: [],
        lastUpdate: moment().unix(),
        updating: false
      };
    },

    handleChange: function(e) {
      var newValue = e.target.value;
      this.setState({searchValue: newValue});
      if (newValue.length > 5 && this.isTimeToUpdate()) {
        this.updateResults(newValue);
      } else if (newValue.length == 0) {
        this.setState({searchResults: []});
      }
    },

    handleKeyDown: function(e) {
      if (e.keyCode === 13) {  // Enter.
        e.preventDefault();
        this.updateResults(this.state.searchValue);
      }
    },

    isTimeToUpdate: function() {
      var now = moment(),
          last = moment.unix(this.state.lastUpdate);
      return now.isAfter(last.add(2,'seconds'));
    },

    updateResults: function(searchValue) {
      console.log('will update results for: ', searchValue);
      var self = this;

      if (this.state.updating) return;
      this.setState({updating: true});

      $.ajax({
        type: 'GET',
        url: '/sources/search/book?query='+searchValue,
        dataType: 'JSON'
      })
      .done(function(data) {
        self.setState({
          searchResults: data, 
          lastUpdate: moment().unix(),
          updating: false
        });
      })
      .fail(function(jqXhr) {
        console.log('search request failed');
      });
    },

    render: function() {
      var result, filterFn;

      filterFn = this.props.resultsFilterFunc;
      result = this.state.searchResults;
      result = filterFn === undefined ? result : result.filter(filterFn);

      result = result.map(function(source, key) {
        return <SearchResult 
                  key={source.id} 
                  data={source}
                  resultsBtnLabel={this.props.resultsBtnLabel} 
                  handler={this.props.handler} />
      }.bind(this));

      return(
        <div className="search-form">
          <input 
            type="text" 
            className="search-field"
            onChange={this.handleChange} 
            onKeyDown={this.handleKeyDown} 
            value={this.state.searchValue} 
            placeholder={this.props.placeholder} />
          <ul className="search-results">
            {this.props.showAtTop}
            {result}
          </ul>
        </div>
      );
    }

  });

  module.exports = Search;  

}());