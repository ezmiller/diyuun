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
			label: React.PropTypes.string
		},

		getDefaultProps: function () {
		    return {
		        type: 'text',
		    };
		},

		render: function() {

			var {
				id,
				type,
				label,
				name,
				...other
			} = this.props;


			var wrapClasses = this.getClasses('input-field', {});

			var inputProps = {
				id: name,
				ref: name,
				type: type,
				name: name
			};

			return (
				<div className={wrapClasses}>
					<input {...inputProps} {...other}/>
				</div>
			);
		}
	});

	module.exports = Input;

}());