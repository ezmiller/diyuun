/**
 * GlobalError
 */
(function() {
	'use strict';

	var React = require('react');

	var GlobalError = React.createClass({

		propTypes: {	
			error: React.PropTypes.object
		},

		getDefaultProps: function() {
		  return {
				error: null
		  };
		},

		render: function() {
			var error, msg;

			error = this.props.error;
			msg = null

			if (error !== null && error.status === 500) {
				msg = error.responseJSON.message;
			}

			return error !== null && error.status === 500 ? (
				<span className="global-error">{msg}</span>
			) : null;
			
		}

	});

	module.exports = GlobalError;

}());