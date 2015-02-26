/**
 * Input
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');

	var Input = React.createClass({

		mixins: [Classable],

		propTypes: {
			id: React.PropTypes.string,
			ref: React.PropTypes.string,
			type: React.PropTypes.string,
			label: React.PropTypes.string,
		},

		getDefaultProps: function () {
		    return {
		        type: 'text'
		    };
		},

		render: function() {

			var {
				id,
				ref,
				type,
				label,
				...other
			} = this.props;

			var classes = this.getClasses('input-field', {});

			return (
				<div className={classes}>
					<input id={id} type={type} />
					<label for={id}>{label}</label>
				</div>
			);
		}
	});

	module.exports = Input;

}());