(function() {
	'use strict';

	// React & components.
	var React = require('react');
	var Router = require('react-router');
	var Link = Router.Link;

	// Mixins.
	var Classable = require('./mixins/classable.js');
	var WindowListenable = require('./mixins/window-listenable.js');

	var PrimaryButton = React.createClass({

		mixins: [Classable, WindowListenable],

		propTypes: {
			disabled: React.PropTypes.bool,
			linkButton: React.PropTypes.bool,
			className: React.PropTypes.string,
	    label: React.PropTypes.string.isRequired,
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

			var classes = this.getClasses('button primary', {});

			var buttonProps = {
				className: classes,
				disabled: disabled,
	    };

		  return linkButton ? (
		  	<Link {...other} {...buttonProps} >
		  		<span className="primary-button-label">{label}</span>
		  	</Link>
		  ) : (
		  	<button {...other} {...buttonProps}>
		  		<span className="primary-button-label">{label}</span>
		  	</button>
		  );

		},
	})

	module.exports = PrimaryButton;

}());