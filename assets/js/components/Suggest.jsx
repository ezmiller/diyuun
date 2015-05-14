/**
 * Suggest
 */
(function() {
	'use strict';

	var React = require('react');

	var Book = React.createClass({

		render: function() {
			return(
				<article className="book">
					<h1 className="title">{this.props.data.title}</h1>
					<img className="cover-image" src={this.props.data.imageLinks.thumbnail} alt="Book Cover" />
				</article>
			);
		}
	});

	var Suggest = React.createClass({

		getInitialState: function () {
		    return {
		        searchValue: '',
		        searchResults: []
		    };
		},

		handleChange: function(e) {
			var newValue = e.target.value;
			this.setState({searchValue: newValue});
			if (newValue.length % 2 === 0) {
				this.updateResults();
			} else if (newValue.length === 0) {
				this.setState({searchResults:[]});
			}
		},

		updateResults: function() {
			var self = this;
			console.log('updateResults() searchValue', this.state.searchValue);
			$.ajax({
				type: 'GET',
				url: '/sources/search/book?query='+this.state.searchValue,
				dataType: 'JSON'
			})
			.done(function(data) {
				console.log(data);
				self.setState({searchResults: data});
			})
			.fail(function(jqXhr) {
				console.log('search request failed');
			});
		},

		render: function() {

			var sources = this.state.searchResults.map(function(source, key) {
				return <li key={key}><Book data={source} /></li>
			});

			return(
				<div className="suggest">
					<h1>Suggest a resource to your colleagues...</h1>
					<form class="search-form">
						<input type="text" onChange={this.handleChange} value={this.state.searchValue} />
						<ul className="search-results">
							{sources}
						</ul>
					</form>
				</div>
			);
		}

	});

	module.exports = Suggest;

}());