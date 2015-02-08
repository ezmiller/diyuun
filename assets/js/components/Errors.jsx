'use strict';

var React = require('react');
var OurDispatcher = require('../dispatcher/OurDispatcher.js');
var ErrorConstants = require('../constants/ErrorConstants.js');



var _ = require('underscore');

var Errors = React.createClass({

	getInitialState: function() {
		return {error: null};
	},

	componentDidMount: function () {
	    OurDispatcher.register(this._errorsCallback);
	},

	render: function() {
		if ( this.state.error && this.state.error === ErrorConstants.E_VALIDATION ) {
			return (
				<div className="error col red accent-2 s12 z-depth-2">
					<p>{this.state.summary}</p>
					<ul>
						{_.map(this.state.invalidAttributes, function(value, key, list	) {
							return <li key={key}>{key}</li>
						})}
					</ul>
				</div>
			);
		} else { return null; }
	},

	_errorsCallback: function(action) {
    	switch(action.actionType) {
			case ErrorConstants.ERROR_DISPLAY:
				this._processError(action.error)
				break;
		}
    },

	_processError: function(error) {
		switch(error.error) {
			case ErrorConstants.E_VALIDATION:
				this.setState(error);
				break;
		}
	}

});

module.exports = Errors;