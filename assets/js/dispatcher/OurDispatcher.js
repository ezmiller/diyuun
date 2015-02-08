/**
 * OurDispatcher
 *
 * A singleton that operates as the central hub for application state.
 */

// define(['flux'], function(Flux) {

	var Flux = require('flux');

	var Dispatcher = Flux.Dispatcher;

	module.exports = new Dispatcher();

	// return new Dispatcher();

// }); // define