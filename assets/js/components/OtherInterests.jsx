/**
 * OtherInterests
 */
(function() {
	'use strict';

	var React = require('react');
	var Classable = require('./mixins/classable.js');

	function removeItem(list, item){
		list.splice(list.indexOf(item), 1);
		return list;
	}

	/**
	 * Tag
	 */
	var Tag = React.createClass({

		handleClick: function(e) {
			this.props.action && this.props.action(this.props.tagName);
		},

		render: function() {
			return(
				<li onClick={this.handleClick} className="tag">
					{this.props.tagName}
				</li>
			);
		}

	});

	/**
	 * TagList
	 */
	var TagList = React.createClass({

		mixins: [Classable], 

		render: function() {

			var classes = this.getClasses('', {
				'tag-list': true,
			});

			return (
				<ul className={classes}>
					{this.props.children}
				</ul>
		 	);
		}
	});

	/**
	 * SuggestedTags
	 */
	var SuggestedTags = React.createClass({

		render: function() {
			return(
				<div className="suggested-tags">
					{this.props.children}
				</div>
			);
		}

	});

	/**
	 * OtherInterests
	 */
	var OtherInterests = React.createClass({

		mixins: [Classable],

		getInitialState: function() {
			return {
				'suggestedTags': [],
				'selectedTags': []
			};
		},

		componentDidMount: function() {
			var self = this;
			$.get('/disciplines', function(data) {
				console.log('disciplines: ', data);
				self.setState({'suggestedTags': data.map(function(o) {return o.name}) });
			});
		},

		addTag: function(tagToAdd) {
			this.state.selectedTags.push(tagToAdd)
			this.setState({
				'suggestedTags': removeItem(this.state.suggestedTags, tagToAdd),
				'selectedTags': this.state.selectedTags
			});
			this.props.interests.set(this.state.selectedTags);
		},

		removeTag: function(tagToRemove) {
			this.state.suggestedTags.push(tagToRemove);
			this.setState({
				'suggestedTags': this.state.suggestedTags,
				'selectedTags': removeItem(this.state.selectedTags, tagToRemove)
			});
			this.props.interests.set(this.state.selectedTags);
		},

		render: function() {
			var self = this,
					classString = this.props.className;

			var selectedTags = this.state.selectedTags.map(function(tag,i) {
				return <Tag key={i} tagName={tag} action={self.removeTag} added={true} />;
			});

			var suggestedTags = this.state.suggestedTags.map(function(tag,i) {
				return <Tag key={i} tagName={tag} action={self.addTag} added={false} />;
			});

			var classes = this.getClasses('', {
				'hide': classString.indexOf('hide') !== -1, // Temporary. Can use classable mixin later.
				'interest': true
			});

			return(
				<div className={classes}>
					<TagList>{selectedTags}</TagList>
					<SuggestedTags>{suggestedTags}</SuggestedTags>
				</div>
			);
		}
	});

	module.exports = OtherInterests;

}());