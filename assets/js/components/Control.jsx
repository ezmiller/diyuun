/**
 * Control
 */
(function() {
	'use strict';

	var AuthStore = require('../stores/AuthStore.js');

	var React = require('react');
	var mui = require('material-ui');
	var Router = require('react-router');
	var Link = Router.Link;
	var Toolbar = mui.Toolbar;
	var ToolbarGroup = mui.ToolbarGroup;
	var FlatButton = mui.FlatButton;

	var Control = React.createClass({

		componentWillMount: function () {
		 	
		},

		render: function() {
			return(
				<Toolbar className="control">
					<ToolbarGroup>
						<Link to="login">
							<FlatButton 
								className="login-btn"
								linkButton={true} 
								label="Login" />
						</Link>
					</ToolbarGroup>
				</Toolbar>
			);
		}

	});

	module.exports = Control;

}());