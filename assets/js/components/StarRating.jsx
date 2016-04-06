/**
 * StarRatings
 * 
 */
(function() {
  'use strict';

  var React = require('react');

  var Star = React.createClass({
    render: function() {
      return <span>&#9734;</span>;
    }
  });

  var StarRating = React.createClass({

    getDefaultProps: function () {
      return {
         range: 5  
      };
    },

    getInitialState: function () {
      return {
        rating: 0       
      };
    },

    handleClick: function(e) {
      var newRating = parseInt(e.target.id);
      this.setState({rating: newRating});
      this.props.handler(newRating);
    },

    render: function() {
      var stars = [],
          cx = React.addons.classSet;

      // Note: Setting id values in reverse because stars order is reversed on page.
      for (var i=0; i < this.props.range; i++) {
        var classes = cx({'marked': 5-i <= this.state.rating });
        stars.push(<span className={classes} key={i} id={5-i} onClick={this.handleClick}>&#9734;</span>);
      }

      return (
        <div className="rating-wrap">
          <div className="rating">
            {stars}
          </div>
        </div>
      );
    }

  });

  module.exports = StarRating;

}());