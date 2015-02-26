/**
 * Dialog
 */
(function() {
  'use strict';

  var React = require('react');
  var Classable = require('./mixins/classable');
  var DialogWindow = require('./DialogWindow.jsx');

  var Dialog = React.createClass({

    mixins: [Classable],

    propTypes: {
      title: React.PropTypes.string
    },

    render: function() {
      var {
        className,
        title,
        ...other
      } = this.props;
      var classes = this.getClasses('dialog');

      return (
        <DialogWindow
          {...other}
          ref="dialogWindow"
          className={classes}>

          <h3 className="dialog-title">{this.props.title}</h3>
          <div ref="dialogContent" className="dialog-content">
            {this.props.children}
          </div>

        </DialogWindow>
      );
    },

    dismiss: function() {
      this.refs.dialogWindow.dismiss();
    },

    show: function() {
      this.refs.dialogWindow.show();
    }

  });

  module.exports = Dialog;

}());