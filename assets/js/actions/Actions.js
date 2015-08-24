/**
 * Actions
 */
/*jslint node:true*/
(function() {
  'use strict';

  var OurDispatcher = require('../dispatcher/OurDispatcher.js'),
      _ = require("underscore"),
      actions = {};

  var DiscussionConstants = require('../constants/DiscussionConstants.js'),
      SourceConstants = require('../constants/SourceConstants.js'),
      AuthConstants = require('../constants/AuthConstants.js');

  _.each([

      // Authorization
      AuthConstants.updateCurrentUser,
      AuthConstants.updateCurrentUserAvatar,

      // Sources
      SourceConstants.getSource,
      SourceConstants.getRecommendations,

      // Discussions
      DiscussionConstants.createDiscussion,
      DiscussionConstants.getDiscussions,
      DiscussionConstants.getDiscussionsForSource,
      DiscussionConstants.addComment,
      DiscussionConstants.updateComment,
      
      ],
      function(name){
        actions[name] = function(payload){
          return OurDispatcher.dispatch({
            actionType: name,
            payload: payload
          });
        };
      });

  module.exports = actions;

}());