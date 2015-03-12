/**
 * Register
 */
(function() {

	var React = require('react');
	var State = require('react-router').State;

	var Register = React.createClass({

		mixins: [State],

		getInitialState: function () {
		    return {
					'name': '',
					'firstName': '',
					'lastName': '',
					'email': '',
					'title': '',
					'affiliation': '',
		    };
		},

		componentDidMount: function () {
			var self = this,
					params = this.getParams();

			if (!params || !params.token)
				return;

			$.get('/pendingusers/' + params.token, function(data) {
				data.name = data.firstName + ' ' + data.lastName;
				self.setState(data);
			});
		},

		handleChange: function(e) {
			var newState = {};
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);
		},

		handleSubmit: function(e) {
			var name,
					user = {};

			e.preventDefault();

			// Create user to deliver to server.
			name = this.state.name.split(' ');
			user.firstName = name[0];
			user.lastName = name[1];
			user.email = this.state.email.trim();
			user.username = user.email;
			user.password = this.state.password.trim();
			user.title = this.state.title.trim();
			user.affiliation = this.state.affiliation.trim();

			console.log(user);

			// Now register the user.
			this.register(user);
		},

		register: function(user) {
			var self = this;

			// Make Ajax call to authentication endpoint.
			$.ajax({
				type: 'POST',
				url: '/auth/local/register',
				data: user
			})
			.done(function(data) {
				console.log(data);
				self.props.valueLink.requestChange(true);
			})
			.fail(function(jqXhr) {
				console.log('failed to register');
			});
		},

		render: function() {
			return (
				<form className="user-signup-form" onSubmit={this.handleSubmit}>
					<div>
					<input
						type="text"
				    name="name"
				    ref="name"
				    placeholder="Name"
				    value={this.state.name}
				    onChange={this.handleChange} />
				  </div>
				  <div>
				  <input
						type="email"
				    name="email"
				    ref="email"
				    placeholder="Email"
				    value={this.state.email}
				    onChange={this.handleChange} />
				  </div>
				  <div>
				  <input
						type="text"
				    name="title"
				    ref="title"
				    placeholder="Title/Role"
				    value={this.state.title}
				    onChange={this.handleChange}/>
				  </div>
				  <div>
				  <input
						type="text"
				    name="affiliation"
				    ref="affiliation"
				    placeholder="Affiliation"
				    value={this.state.affiliation}
				    onChange={this.handleChange}/>
				  </div>
				  <div>
				  <input
						type="password"
				    name="password"
				    ref="password"
				    placeholder="Password"
				    onChange={this.handleChange}/>
				  </div>
				  <br/>
				  <input type="submit" value="Sign Up" />
				</form>
			);
		}
	});

	module.exports = Register;

}());


