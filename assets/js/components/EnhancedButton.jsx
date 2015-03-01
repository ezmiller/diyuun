/**
 * EnhancedButton
 */
(function() {
	'use strict';

	var React = require('react');
	var Router = require('react-router');
	var Classable = require('./mixins/classable.js');
	var WindowListenable = require('./mixins/window-listenable.js');
	var Link = Router.Link;

	var EnhancedButton = React.createClass({

		// TODO: Add ripple effects?

		mixins: [Classable, WindowListenable],

		propTypes: {
			disabled: React.PropTypes.bool,
			linkButton: React.PropTypes.bool,
		},

		getInitialState: function () {
			return {};
		},

		render: function() {
			var {
				label,
				disabled,
				linkButton,
				...other } = this.props;

			var linkButton = linkButton ? true : false;

			var classes = this.getClasses('btn', {
				'waves-effect': true
			});
			var buttonProps = {
				className: classes,
				disabled: disabled,
	    };
	    var buttonChildren = [
		      this.props.children,
		  ];

		  return linkButton ? (
		  	<Link {...other} {...buttonProps} >
		  		{buttonChildren}
		  	</Link>
		  ) : (
		  	<button {...other} {...buttonProps}>
		  		{buttonChildren}
		  	</button>
		  );

		},


	});

	module.exports = EnhancedButton;

}());