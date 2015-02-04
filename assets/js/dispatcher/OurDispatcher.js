/**
 * OurDispatcher
 *
 * A singleton that operates as the central hub for application state.
 */

define(['flux'], function(Flux) {

	var Dispatcher = Flux.Dispatcher;

	return new Dispatcher();

}); // define