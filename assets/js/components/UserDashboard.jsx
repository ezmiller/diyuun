/**
 * UserDashboard
 */
(function() {
	'use strict';

	import React from 'react';

	class Books extends React.Component {
		render() {
			return (
				<section className="books">
					<p>Some book stuff will go here</p>
				</section>
			);
		}
	}

	// var Reveiws = require('./Reveiws.jsx');
	// var Articles = require('./Articles.jsx');

	class _UserDashboard extends React.Component {
		render() {
			return(
				<div className="user-dashboard">
					<Books />
				</div>
			);
		}
	}
	export const UserDashboard = React.createClass(_UserDashboard.prototype);

}());