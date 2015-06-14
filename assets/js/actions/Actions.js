/**
 * Actions
 */
(function() {
  'use strict';

  var OurDispatcher = require('../dispatcher/OurDispatcher.js'),
      _ = require("underscore"),
      actions = {};

  var SourceConstants = require('../constants/SourceConstants.js'),
      AuthConstants = require('../constants/AuthConstants.js');

  _.each([

      // Authorization
      AuthConstants.loginUser,
      AuthConstants.logoutUser,

      // Sources
      SourceConstants.getSource,
      SourceConstants.getRecommendations,
      
      ],
      function(name){
        actions[name] = function(payload){
          return OurDispatcher.dispatch({
            actionType: name,
            payload: payload
          });
        }
      });

  module.exports = actions;

}());