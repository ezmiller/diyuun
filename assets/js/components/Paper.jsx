/**
 * Paper
 */
(function() {
	'use strict';

	var React = require('react'),
	  Classable = require('./mixins/classable.js');

	var Paper = React.createClass({

	  mixins: [Classable],

	  propTypes: {
	    circle: React.PropTypes.bool,
	    innerClassName: React.PropTypes.string,
	    rounded: React.PropTypes.bool,
	    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
	  },

	  getDefaultProps: function() {
	    return {
	      innerClassName: '',
	      rounded: true,
	      zDepth: 1
	    };
	  },

	  render: function() {
	    var {
	      className,
	      circle,
	      innerClassName,
	      rounded,
	      zDepth,
	      ...other } = this.props,
	      classes = this.getClasses(
	        'paper ' +
	        'z-depth-' + this.props.zDepth, { 
	        'rounded': this.props.rounded,
	        'circle': this.props.circle
	      }),
	      insideClasses = 
	        this.props.innerClassName + ' ' +
	        'paper-container ' +
	        'z-depth-bottom';

	    return (
	      <div {...other} className={classes}>
	        <div ref="innerContainer" className={insideClasses}>
	          {this.props.children}
	        </div>
	      </div>
	    );
	  },

	  getInnerContainer: function() {
	    return this.refs.innerContainer;
	  }

	});

	module.exports = Paper;

}());