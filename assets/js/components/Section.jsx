/**
 * Section
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');

	var Section = React.createClass({

		mixins: [Classable],

		render: function() {

	    var classes = this.getClasses('section', {});

			return (
				<section className={classes}>
					{this.props.children}
				</section>
			);
		}
	});

	module.exports = Section;

}());