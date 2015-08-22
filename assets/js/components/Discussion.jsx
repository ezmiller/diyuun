/**
 * Discussion
 */
(function() {
  'use strict';

  // React
  var React = require('react');

  // Flux
  var Actions = require('../actions/Actions.js');

  // React Cursor
  var Cursor = require('react-cursor').Cursor;

  // Helpers toolkit
  var Helpers = require('../helpers/helpers.js');

  // Marked (markdown)
  var marked = require('marked');

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  var Comment = React.createClass({

  	propTypes: {
  		comment: React.PropTypes.object.isRequired
  	},

  	getDefaultProps: function () {
	    return {
	      comment: null  
	    };
  	},

  	render: function() {
      var comment, user, date, dateStr, name, text;

      var months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];

      comment = this.props.comment;
      user = comment.user;
      name = user.firstName + ' ' + user.lastName;
      date = new Date(Date.parse(comment.createdAt));
      text = marked(Helpers.decodeHTMLEntities(comment.text));


  		return (
  			<article className="comment">
  				<header>
            <span className="avatar-wrap"><img className="avatar" src={user.avatar} alt="User Avatar" /></span>
            <div className="meta">
              <span className="user">{name}</span><br/>
              <span className="user-meta">{user.title}, {user.affiliation}</span>
            </div>
            <span className="date">{months[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear()} at {date.getHours() + ':' +date.getSeconds()}</span>
          </header>
  				<div 
            className="comment-body"
            dangerouslySetInnerHTML={{__html: text}}></div>
  				<footer>
  				</footer>
  			</article>
  		);
  	}

  });

  var ContentEditable = React.createClass({

    shouldComponentUpdate: function(nextProps){
      return nextProps.html !== this.getDOMNode().innerHTML;
    },

    componentDidUpdate: function() {
      if ( this.props.html !== this.getDOMNode().innerHTML ) {
         this.getDOMNode().innerHTML = this.props.html;
      }
    },

    emitChange: function(){
      var html = this.getDOMNode().innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
          this.props.onChange({
              target: {
                  value: html
              }
          });
      }
      this.lastHtml = html;
    },

    render: function() {
      return <div 
              className={this.props.className}
              id="contenteditable"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              onInput={this.emitChange}
              onBlur={this.emitChange}
              contentEditable
              dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }

  });

  var CommentForm = React.createClass({

    propTypes: {
      user: React.PropTypes.object.isRequired
    },

    getDefaultProps: function() {
      return {
        user: null
      };
    },

    getInitialState: function () {
      return {
        comment: ''
      };
    },

    handleChange: function(e) {
      this.setState({comment: e.target.value});
    },

    handleKeyDown: function(e) {
      console.log(e.keyCode);
      if (e.keyCode === 13) { // Enter
        React.findDOMNode(e.target).appendChild(document.createElement('br'));
        e.preventDefault();
      }
    },

    handleSubmit: function(e) {
      var comment, text;

      e.preventDefault();

      text = this.state.comment;
      text = text.replace(/<div>/gmi, '');
      text = text.replace(/<\/div>/gmi, "<br>");

      console.log('text:', Helpers.escapeHtml(text));

      comment = {
        user: this.props.user.value.id,
        text: Helpers.escapeHtml(text),
        discussions: [ this.props.discussionId ]
      };

      console.log('CommentForm::handleSubmit: ', comment);

      Actions.addComment(comment);

    },

    render: function() {
      return (
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="form-header">
            <span className="form-prompt">Say Something</span>
          </div>
          <div className="fields-wrap">
            <textarea 
              className="text" 
              placeholder="Write your response"
              onChange={this.handleChange}>{this.state.comment}</textarea>
            <div className="controls-wrap">
              <button type="submit" className="button outline submit">Post</button>
            </div>
          </div>
        </form>
      );
    }

  });

  var Discussion = React.createClass({

  	propTypes: {
  		discussions: React.PropTypes.instanceOf(Cursor).isRequired,
      user: React.PropTypes.instanceOf(Cursor).isRequired
  	},

  	getDefaultProps: function () {
	    return {
	    	discussions: null
	    };
  	},

  	render: function() {
  		var discussion, id, title, privacy, comments;

  		discussion = this.props.discussions.value ? this.props.discussions.value[0] : null;
      id = discussion ? discussion.get('id') : null;
  		title = discussion ? discussion.get('title') : null;
  		privacy = discussion ? discussion.get('private') : null;


      comments = discussion ? discussion.get('comments').map(function(comment, i) {
        return <Comment key={i} comment={comment} />;
      }) : null;

  		return (
	  		<div className="discussion">
  				<header className="discussion-header">
  					<h4 className="title">{title}</h4>
  					<div className="meta">
  						<span className="privacy-icon"><i className={privacy ? 'fa fa-lock' : 'fa fa-unlock'}></i></span>
  						<span className="privacy-label">{privacy ? 'Private' : 'Public'} Discussion</span>
  					</div>
  				</header>
          {comments}
          <CommentForm user={this.props.user} discussionId={id} />
	  		</div>
	  	);
  	}

  });

  module.exports = Discussion;

}());