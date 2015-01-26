'use strict';

// TODO: Set this up with a factory function instead of defining each error repeatedly.
// NOTE: This could also be done using the extend-error module: http://goo.gl/gbq5Iz

/**
 * Makes the custom errors accessible globally
 * @module CustomErrors
 */
module.exports = {

	'InvalidArgumentError': InvalidArgumentError,
	'FailedToPersistDataError': FailedToPersistDataError,
	'ISBNError': ISBNError

};

/**
 * Indicates an error where an invalid argument or input to a method.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function InvalidArgumentError(message) {
	this.name = 'InvalidArgumentError';
	this.message = message || 'Invalid Argument';
	Error.captureStackTrace(this);
}
InvalidArgumentError.prototype = new Error();
InvalidArgumentError.prototype.constructor = InvalidArgumentError;

/**
 * Indicates an error in which the system has failed to save or "persist" some
 * piece of data.  E.g. when it has not been possible to save some piece of data
 * to the db.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function FailedToPersistDataError(message) {
	this.name = 'FailedToPersistDataError';
	this.message = message || 'Failed to persist data.';
	Error.captureStackTrace(this);
}
FailedToPersistDataError.prototype = new Error();
FailedToPersistDataError.prototype.constructor = FailedToPersistDataError;

/**
 * Indicates an error in which a user has submitted a malformed ISBN.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function ISBNError(message) {
	this.name = 'ISBNError';
	this.message = message || 'ISBN Invalid.';
	Error.captureStackTrace(this);
}
ISBNError.prototype = new Error();
ISBNError.prototype.constructor = ISBNError;