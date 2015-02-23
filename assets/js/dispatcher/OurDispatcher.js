/**
 * OurDispatcher
 *
 * A singleton that operates as the central hub for application state.
 */
(function() {
	'use strict';

	var Flux = require('flux');

	var Dispatcher = Flux.Dispatcher;

	module.exports = new Dispatcher();

}());