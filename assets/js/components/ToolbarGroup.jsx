/**
 * ToolbarGroup
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');

	var ToolbarGroup = React.createClass({

		propTypes: {
			float: React.PropTypes.string
		},

		mixins: [Classable],

		render: function() {

			var classes = this.getClasses('toolbar-group', {
				'left': this.props.float == 'left',
				'right': this.props.float == 'right'
			});

			return (
				<ul className={classes}>
					{this.props.children}
				</ul>
			);
		}

	});

	module.exports = ToolbarGroup;

}());