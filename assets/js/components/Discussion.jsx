/**
 * Discussion
 *
 * //TODO: The EditableComment and the CommentForm can probably be merged to avoid duplicate code.
 */
(function() {
  'use strict';

  var $ = require('jquery');
  var _ = require('underscore');
  var classNames = require('classnames');

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

  var EditableComment = React.createClass({

    propTypes: {
      comment: React.PropTypes.object.isRequired,
      clickHandler: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
      return {
        mode: 'default',
        commentText: this.props.comment.text,
        textAreaHeight: undefined     
      };
    },

    componentDidMount: function () {
      this.setState({textAreaHeight: this.calculateTextAreaHeight()});
    },

    calculateTextAreaHeight: function() {
      var textarea = React.findDOMNode(this.refs.text);
      return textarea.scrollHeight + 'px';
    },

    handleChange: function(e) {
      this.setState({
        commentText: e.target.value,
        textAreaHeight: this.calculateTextAreaHeight()
      });
    },

    handleSubmit: function(e) {
      var updatePayload = {};
      updatePayload.id = this.props.comment.id;
      updatePayload.text = this.state.commentText.trim();
      this.props.clickHandler(e, updatePayload);
    },

    handlePreviewToggle: function(e) {
      e.preventDefault();
      this.setState({mode: this.state.mode ==='default' ? 'preview' : 'default'});
    },

    render: function() {

      var txtStyles = {
        'height': this.state.textAreaHeight
      };

      var contentArea = this.state.mode === 'default' ? (
        <textarea
          ref="text"
          className="text" 
          style={txtStyles}
          onChange={this.handleChange}
          value={this.state.commentText}></textarea>
      ) : (
        <div 
          className="text" 
          dangerouslySetInnerHTML={{__html: marked(this.state.commentText)}}></div>
      );

      var controls = this.state.mode === 'default' ? (
        <div className="controls-wrap">
          <button name="cancel" className="button flat cancel" onClick={this.props.clickHandler}>Cancel</button>
          <button name="cancel" className="button flat preview" onClick={this.handlePreviewToggle}>Preview</button>
          <button name="submit" className="button outline submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="controls-wrap">
          <button name="edit" className="button flat edit" onClick={this.handlePreviewToggle}>Edit</button>
        </div>
      );

      return (
        <form className="editable-comment">
          <div className="form-header">
            <span className="form-prompt">Edit</span>
          </div>
          <div className="fields-wrap">
            {contentArea}
            {controls}
          </div>
        </form>
      );
    }

  });

  var DefaultComment = React.createClass({

  	propTypes: {
  		comment: React.PropTypes.object.isRequired,
      clickHandler: React.PropTypes.func.isRequired,
      owned: React.PropTypes.bool.isRequired
  	},

  	getDefaultProps: function () {
	    return {
	      comment: null,
        clickHandler: undefined,
        owned: false
	    };
  	},

    handleDeleteClick: function(e) {
      this.props.clickHandler(e, this.props.comment.id)
    },

  	render: function() {
      var comment, user, date, dateStr, name, text, owned;

      var months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];

      comment = this.props.comment;
      user = comment.user;
      name = user.firstName + ' ' + user.lastName;
      date = new Date(Date.parse(comment.createdAt));
      text = marked(Helpers.decodeHTMLEntities(comment.text));
      owned = this.props.owned;

  		return (
  			<article className="comment">
  				<header>
            <span className="avatar-wrap"><img className="avatar" src={user.avatar} alt="User Avatar" /></span>
            <div className="meta">
              <span className="user">{name}</span><br/>
              <span className="user-meta">{user.title}, {user.affiliation}</span>
            </div>
            <span className="date">{months[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear()} at {date.getHours() + ':' +date.getSeconds()}</span>
            <div className="controls">
              <a 
                href="#" 
                name="edit" 
                className="comment-edit-button" 
                style={{display: owned == true ? 'initial' : 'none'}}
                onClick={this.props.clickHandler}>
                <i name="edit" className="fa fa-pencil"></i>
              </a>
              <a 
                href="#" name="delete" 
                className="comment-delete-button" 
                style={{display: owned == true ? 'initial' : 'none'}} 
                onClick={this.handleDeleteClick}>
                <i className="fa fa-times"></i>
              </a>
            </div>
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

  var Comment = React.createClass({

    propTypes: {
      comment: React.PropTypes.object.isRequired,
      owned: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
      return {
        comment: null,
        owned: false
      };
    },

    getInitialState: function () {
      return {
        mode: 'default'      
      };
    },

    handleClick: function(e, payload) {
      var target = e.currentTarget.name;
      e.preventDefault();
      switch (target) {
        case 'delete':
          Actions.deleteComment(payload);
          break;
        case 'edit':
          this.setState({mode: 'edit'});
          break;
        case 'submit':
          Actions.updateComment(payload);
          this.setState({mode: 'default'});
          break;
        case 'cancel':
          this.setState({mode: 'default'});
          break;
      }
    },

    render: function() {

     return this.state.mode === 'default' ? (
        <DefaultComment comment={this.props.comment} clickHandler={this.handleClick} owned={this.props.owned} />
      ) : (
        <EditableComment comment={this.props.comment} clickHandler={this.handleClick} />
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
        mode: 'edit',
        comment: '',
        textAreaHeight: undefined
      };
    },

    handleChange: function(e) {
      this.setState({
        comment: e.target.value,
        textAreaHeight: this.calculateTextAreaHeight()
      });
    },

    handleKeyDown: function(e) {
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

      comment = {
        user: this.props.user.value.id,
        text: Helpers.escapeHtml(text),
        discussions: [ this.props.discussionId ]
      };

      Actions.addComment(comment);
      this.setState({comment:'', textAreaHeight: undefined});
    },

    calculateTextAreaHeight: function() {
      var textarea = React.findDOMNode(this.refs.text);
      return textarea.scrollHeight + 'px';
    },

    getNextMode: function() {
      return this.state.mode === 'edit' ? 'preview' : 'edit';
    },

    toggleMode: function(e) {
      e.preventDefault();
      this.setState({mode: this.state.mode === 'edit' ? 'preview' : 'edit'});
    },

    render: function() {
      
      var txtStyles = {
        'height': this.state.textAreaHeight
      };

      var txtInputArea = this.state.mode === 'edit' ? (
        <textarea
              ref="text"
              className="text" 
              style={txtStyles}
              placeholder="Write your response"
              onChange={this.handleChange}
              value={this.state.comment}></textarea>
      ) : (
        <div 
          className="text" 
          dangerouslySetInnerHTML={{__html: marked(this.state.comment)}}></div>
      );

      var controls = this.state.mode === 'edit' ? (
        <div className="controls-wrap">
          <button className="button flat preview" onClick={this.toggleMode}>{this.getNextMode()}</button>
          <button type="submit" className="button outline submit">Post</button>
        </div>
      ) : (
        <div className="controls-wrap">
          <button className="button flat preview" onClick={this.toggleMode}>{this.getNextMode()}</button>
        </div>
      );

      return (
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="form-header">
            <span className="form-prompt">Say Something</span>
          </div>
          <div className="fields-wrap">
            {txtInputArea}
            {controls}
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

    isFollowed: function() {
      var id = this.props.discussions.value[0] ? this.props.discussions.value[0].id : null;
      var followed = _.pluck(this.props.user.value.followedDiscussions, 'id');
      return followed.some(function(v) { return id == v });
    },

    commentOwnedByUser: function(comment) {
      var currUserId = this.props.user.value.id;
      return comment.user.id === currUserId;
    },

    handleClick: function(e) {
      var userId, discussionId, followOrUnFollow;

      e.preventDefault();

      switch (e.target.id) {
        case 'bookmark':   
          userId = this.props.user.value.id;
          discussionId = this.props.discussions.value[0].id;
          followOrUnFollow = this.isFollowed() ? 'unfollow' : 'follow';
          $.get('/user/' + userId + '/' + followOrUnFollow + '/discussion/' + discussionId)
            .done(function(data) {
              Actions.refreshCurrentUser();
            })
            .fail(function(jqXhr) {
              console.log(jqXhr);
            });
          break;
      }
    },

  	render: function() {
  		var discussion, id, title, privacy, comments, followed, followClasses;

  		discussion = this.props.discussions.value ? this.props.discussions.value[0] : null;
      id = discussion ? discussion.get('id') : null;
  		title = discussion ? discussion.get('title') : null;
  		privacy = discussion ? discussion.get('private') : null;

      comments = discussion ? discussion.get('comments').map(function(comment, i) {
        return <Comment key={i} comment={comment} owned={this.commentOwnedByUser(comment)} />;
      }.bind(this)) : null;

      followed = this.isFollowed();
      followClasses = classNames('fa', {
        'fa-bookmark': followed, 
        'fa-bookmark-o': !followed
      });

  		return (
	  		<div className="discussion">
  				<header className="discussion-header">
            <div className="discussion-title-wrap">
              <span className="privacy-label">{privacy ? 'Private Discussion' : 'Public Discussion'}</span>
    					<h4 className="title">{title}</h4>
            </div>
            <div className="discussion-meta">
              <i id="bookmark" className={followClasses} onClick={this.handleClick}></i>
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