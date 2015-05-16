/**
 * Suggest
 */
(function() {
	'use strict';

	var moment = require('moment');

	var React = require('react');

	var SearchResult = React.createClass({

		handleClick: function(e) {
			e.preventDefault();
			this.props.handler(this.props.data);
		},

		render: function() {
			var authors,
					source = this.props.data;

			authors = source.authors.map(function(author,key) {
				return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
			});

			return (
				<li key={source.id} className="item">
					<img className="image" src={source.imageLinks.thumbnail} alt="Book Cover" />
					<div className="metadata">
						<h1 className="title">{source.title}</h1>
						<h2 className="subtitle">{source.subtitle}</h2>
						<p className="authors">{authors}</p>
					</div>
					<button onClick={this.handleClick}>Recommend</button>
				</li>
			);
		}

	});

	var Search = React.createClass({

		getInitialState: function () {
	    return {
        searchValue: '',
        searchResults: [],
        lastUpdate: moment().unix(),
        updating: false
	    };
		},

		handleChange: function(e) {
			var newValue = e.target.value;
			this.setState({searchValue: newValue});
			if (newValue.length > 0 && this.isTimeToUpdate()) {
				this.updateResults(newValue);
			} else if (newValue.length == 0) {
				this.setState({searchResults: []});
			}
		},

		handleKeyDown: function(e) {
			console.log(e.keyCode);
			if (e.keyCode === 13) {  // Enter.
				e.preventDefault();
				this.updateResults(this.state.searchValue);
			}
		},

		isTimeToUpdate: function() {
			var now = moment(),
					last = moment.unix(this.state.lastUpdate);
			return now.isAfter(last.add(3,'seconds'));
		},

		updateResults: function(searchValue) {
			var self = this;
			console.log('updateResults() searchValue', searchValue);

			if (this.state.updating) return;
			this.setState({updating: true});

			$.ajax({
				type: 'GET',
				url: '/sources/search/book?query='+searchValue,
				dataType: 'JSON'
			})
			.done(function(data) {
				self.setState({
					searchResults: data, 
					lastUpdate: moment().unix(),
					updating: false
				});
			})
			.fail(function(jqXhr) {
				console.log('search request failed');
			});
		},

		render: function() {
			var self = this,
					result;

			result = this.state.searchResults.map(function(source, key) {
				return <SearchResult key={source.id} data={source} handler={self.props.handler} />
			});

			return(
				<form className="search-form">
					<input 
						type="text" 
						className="search-field"
						onChange={this.handleChange} 
						onKeyDown={this.handleKeyDown} 
						value={this.state.searchValue} 
						placeholder="Search" />
					<ul className="search-results">
						{result}
					</ul>
				</form>
			);
		}

	});

	var Suggest = React.createClass({

		getInitialState: function () {
	    return {
        source: null  
	    };
		},

		handleRecommendClick: function(source) {
			console.log(source);
			this.setState({source: source});
		},

		render: function() {
			var source = this.state.source,
					authors,
					content;

			authors = !source ? null : source.authors.map(function(author,key) {
				return <span key={key} className="author">{author.firstName} {author.lastName}</span>;
			});

			content = source ? (
				<form className="recommendation-form">
					<div class="source">
						<img className="image" src={source.imageLinks.thumbnail} alt="Book Cover" />
						<div className="metadata">
							<h1 className="title">{this.state.source.title}</h1>
							<h2 className="subtitle">{this.state.source.subtitle}</h2>
							<p className="authors">{authors}</p>
						</div>
					</div>
					<label htmlFor="rating">How important?</label>
					<input type="text" id="rating" className="rating" /> 
					<textarea className="recommend-msg" placeholder="Why is this text important?" />
					<button>Submit</button>
				</form>
			) :  (
				<Search handler={this.handleRecommendClick} />
			);
			return (
				<div className="suggest">
					{content}
				</div>
			);
		}
	});

	module.exports = Suggest;

}());