/**
 * PrimaryButton
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');
	var EnhancedButton = require('./Enhancedbutton.jsx');

	var PrimaryButton = React.createClass({

		mixins: [Classable],

	  propTypes: {
	    className: React.PropTypes.string,
	    label: React.PropTypes.string.isRequired,
	  },

	  render: function() {

	    var {
	        label,
	        ...other
	      } = this.props;

	    var classes = this.getClasses('primary', {});

	    return (
	      <EnhancedButton 
	      	{...other}
	        className={classes} >
	        <span className="primary-button-label">{label}</span>
	      </EnhancedButton>
	    );
	  }

	});

	module.exports = PrimaryButton;

}());