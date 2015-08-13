/**
 * UserAccount
 */
(function() {
	'use strict';

	var React = require('react');
	var GlobalError = require('./GlobalError.jsx');
	var Actions = require('../actions/Actions.js');
	var Cursor = require('react-cursor');
	
	var UserAccount	 = React.createClass({

		getDefaultProps: function () {
	    return {  
	    	user: {}
	    };
		},

		getInitialState: function () {
			var user = this.props.user.value;
		  return {
		  	'id': user.id,
		  	'email': user.email,
		  	'username': user.username,
				'name': user.firstName + ' ' + user.lastName,
				'title': user.title,
				'affiliation': user.affiliation,
				'role': user.role,
				'discipline': user.discipline,
				'avatar': user.avatar
		  };
		},

		handleChange: function(e) {
			var newState = {};
			newState[e.target.name] = e.target.value;
			console.log(newState);
			this.setState(newState);
		},

		handleSubmit: function(e) {
			e.preventDefault();
			Actions.updateCurrentUser(this.state);
		},

		handleClick: function(e) {
			var fileInput;
			e.preventDefault();
			this.openFileInput();
		},

		handleAvatarChange: function(e) {
			var files;
			e.preventDefault();
			if (e.dataTransfer) {
	      files = e.dataTransfer.files;
	    } else if (e.target) {
	      files = e.target.files;
	    }
	    Actions.updateCurrentUserAvatar(files[0]);
		},

		openFileInput: function() {
			var fileInput = React.findDOMNode(this.refs.fileInput);
	    fileInput.value = null;
	    fileInput.click();
		},

		render: function() {
			var user = this.props.user.value;
			return(
				<div className="user-account eight columns">
					<GlobalError error={this.props.error.value} />
					<h1>Account</h1>	
					<div className="avatar field-wrap">
						<img src={user.avatar + '?timestamp=' + Date.now()} alt="User Avatar" />
						<a className="change-picture" onClick={this.handleClick}>Change Picture</a>
						<input 
							type="file" 
							name="avatar" 
							style={{display: 'none'}} 
							ref="fileInput" 
							onChange={this.handleAvatarChange} />
					</div>
					<form className="user-account-form" onSubmit={this.handleSubmit}>
						<fieldset>
							<legend>Basic Settings</legend>
							<div className="field-wrap">
								<label htmlFor="name">Name</label>
								<input 
									type="text" 
									id="name" 
									name="name" 
									defaultValue={user.firstName + ' ' + user.lastName} 
									value={this.state.name} 
									onChange={this.handleChange} /> 
							</div>
							<div className="field-wrap">
								<label htmlFor="email">Email</label>
								<input 
									type="text" 
									id="email" 
									name="email"  
									defaultValue={user.email} 
									value={this.state.email} 
									onChange={this.handleChange} /> 
							</div>
							<div className="field-wrap">
								<label htmlFor="title">Title</label>
								<input 
									type="text" 
									id="title" 
									name="title" 
									defaultValue={user.title}
									value={this.state.title} 
									onChange={this.handleChange} /> 
							</div>
							<div className="field-wrap">
								<label htmlFor="affiliation">Affiliation</label>
								<input 
									type="text" 
									id="affiliation" 
									name="affiliation" 
									defaultValue={user.affiliation} 
									value={this.state.affiliation} 
									onChange={this.handleChange} /> 
							</div>
							<button>Save</button>
						</fieldset>
					</form>
				</div>
			);
		},

	});

	module.exports = UserAccount	;

}());