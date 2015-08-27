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

  var EditableComment = React.createClass({

    propTypes: {
      comment: React.PropTypes.object.isRequired,
      clickHandler: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
      return {
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

    render: function() {

      var txtStyles = {
        'height': this.state.textAreaHeight
      };

      return (
        <form className="editable-comment">
          <div className="form-header">
            <span className="form-prompt">Edit</span>
          </div>
          <div className="fields-wrap">
            <textarea
              ref="text"
              className="text" 
              style={txtStyles}
              onChange={this.handleChange}
              value={this.state.commentText}></textarea>
            <div className="controls-wrap">
              <button name="cancel" className="button flat cancel" onClick={this.props.clickHandler}>Cancel</button>
              <button name="submit" className="button outline submit" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </form>
      );
    }

  });

  var DefaultComment = React.createClass({

  	propTypes: {
  		comment: React.PropTypes.object.isRequired,
      clickHandler: React.PropTypes.func.isRequired
  	},

  	getDefaultProps: function () {
	    return {
	      comment: null,
        clickHandler: undefined
	    };
  	},

    handleDeleteClick: function(e) {
      this.props.clickHandler(e, this.props.comment.id)
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
            <div className="controls">
              <a href="#" name="edit" className="comment-edit-button" onClick={this.props.clickHandler}>
                <i name="edit" className="fa fa-pencil"></i>
              </a>
              <a href="#" name="delete" className="comment-delete-button" onClick={this.handleDeleteClick}>
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
      comment: React.PropTypes.object.isRequired
    },

    getDefaultProps: function () {
      return {
        comment: null  
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
        <DefaultComment comment={this.props.comment} clickHandler={this.handleClick} />
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