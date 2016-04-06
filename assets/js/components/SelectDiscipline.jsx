/**
* SelectDiscipline
*/
(function() { 
  'use strict';

  var _ = require('underscore');
  var React = require('react');
  var Classable = require('./mixins/classable.js');

  var SelectDiscipline = React.createClass({

    mixins: [Classable],

    getInitialState: function() {
      return {
        "hideSuggestions": true,
        "primaryDisciplineIsValid": false,
        "suggestions": [],
        "filteredSuggestions": [],
        "suggestionSelected": -1
      }
    },

    componentDidMount: function() {
        var self = this;
        $.get('/disciplines', function(data) {
          console.log('disciplines: ', data);
          self.setState({'suggestions': data})
        });
    },

    onChange: function(e) {
      var newSuggestions = [],
          isValid = this.validate(e.target.value);

      if (isValid)
        this.props.discipline.set(isValid);

      // Filter the suggestions based on the user input.
      newSuggestions = this.state.suggestions.filter(function(o) {
        if (o.name.indexOf(e.target.value) === 0)
          return o;
      });

      this.setState({
        'discipline': e.target.value,
        'filteredSuggestions': newSuggestions,
        'primaryDisciplineIsValid': isValid,
        'hideSuggestions': isValid || !(e.target.value.length > 0),
        'suggestionSelected': -1
      });
    },

    onClick: function(e) {
      var isValid = this.validate(e.target.innerHTML);
      this.props.discipline.set(isValid);
      this.setState({
        'hideSuggestions': true,
        'primaryDisciplineIsValid': true
      });
    },

    onKeyDown: function(e) {
      var list = this.state.filteredSuggestions
        , currIndex = this.state.suggestionSelected;

      if (e.keyCode === 40 && this.listWithinBounds(list, currIndex+1)) {  // Arrow Key down.
        this.setState({'suggestionSelected': this.state.suggestionSelected+1});
      }
      else if (e.keyCode === 38 && this.listWithinBounds(list, currIndex-1)) { // Arrow Key up. 
        this.setState({'suggestionSelected': this.state.suggestionSelected-1});
      }
      else if (e.keyCode === 13 || e.keyCode === 9) { // Enter or Tab.
        this.setState({
          'discipline': list[currIndex].name,
          'primaryDisciplineIsValid': true,
          'hideSuggestions': true
        });
        this.props.discipline.set(this.validate(list[currIndex].name));  // Set state in parent
      }
    },

    validate: function(s) {
      var found = _.find(this.state.suggestions, function(o) {
        if ( o.name === s ) return true;
      });
      return (found) ? found : false;
    },

    listWithinBounds: function(filteredSuggestions, nextIdx) {
      return ( nextIdx <= filteredSuggestions.length-1 && nextIdx >= -1 );
    },

    render: function() {
      var self =this;

      var inputClasses = this.getClasses('', {
        'select-discipline': true,
        'valid': this.state.primaryDisciplineIsValid
      });

      var suggestionClasses = this.getClasses('', {
        'suggestion': true,
        'hide': this.state.hideSuggestions
      });

      var suggestions = this.state.filteredSuggestions.map(function(o,i) {
        var selectedClass = (i === self.state.suggestionSelected) ? 'selected' : '';
        return <li key={o.id} className={selectedClass} onClick={self.onClick}>{o.name}</li>
      });

      return(
        <div className="select-discipline-wrap six columns offset-by-three">
          <input
            type="text"
            ref="selectDiscipline"
            className={inputClasses}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Enter Your Primary Field"
            value={this.state.discipline} />
          <ul className={suggestionClasses}>
            {suggestions}
          </ul>
        </div>
      );
    }
  });

  module.exports = SelectDiscipline;

}());