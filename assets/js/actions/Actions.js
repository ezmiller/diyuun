/**
 * Actions
 */
(function() {
  'use strict';

  var OurDispatcher = require('../dispatcher/OurDispatcher.js'),
      _ = require("underscore"),
      actions = {};

  var SourceConstants = require('../constants/SourceConstants.js');

  _.each([

      // Sources
      SourceConstants.getSource,
    
      // Recommendations
      "getRecommendations"
      
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