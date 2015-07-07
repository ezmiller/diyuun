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
      var comment, user, date, name;

      comment = this.props.comment;
      user = this.props.comment.user;
      name = user.firstName + ' ' + user.lastName;
      date = new Date(Date.parse(comment.createdAt));

  		return (
  			<article className="comment">
  				<header>
            <span className="avatar"><i className="fa fa-user"></i></span>
            <div className="meta">
              <span className="user">{name}</span><br/>
              <span className="date">{date.toLocaleDateString()}</span>
            </div>
          </header>
  				<p className="comment-body">
            {comment.text}
  				</p>
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

    handleSubmit: function(e) {
      var comment;

      e.preventDefault();

      comment = {
        user: this.props.user.value.id,
        text: this.state.comment,
        discussions: [ this.props.discussionId ]
      };

      console.log('CommentForm::handleSubmit: ', comment);

      Actions.addComment(comment);

    },

    render: function() {
      return (
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="avatar-wrap">
            <span className="avatar"><i className="fa fa-user"></i></span>
          </div>
          <div className="comment-fields-wrap">
            <ContentEditable className="text" html={this.state.comment} onChange={this.handleChange} />
            <div className="comment-controls-wrap">
              <button type="submit">Submit</button>
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
	  		<div className="discussion eight columns offset-by-two">
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