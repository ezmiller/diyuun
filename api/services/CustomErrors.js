'use strict';

/**
 * Indicates an error where an invalid argument or input to a method.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function InvalidArgumentException(message, stack) {
	this.name = 'InvalidArgumentException';
	this.message = message || 'Invalid Argument';
	this.stack = stack;
}
InvalidArgumentException.prototype = new Error();
InvalidArgumentException.prototype.constructor = InvalidArgumentException;

/**
 * Indicates an error in which the system has failed to save or "persist" some
 * piece of data.  E.g. when it has not been possible to save some piece of data
 * to the db.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function FailedToPersistDataException(message, stack) {
	this.name = 'FailedToPersistDataException';
	this.message = message || 'Failed to persist data.';
	this.stack = stack;
}
FailedToPersistDataException.prototype = new Error();
FailedToPersistDataException.prototype.constructor = FailedToPersistDataException;

/**
 * Indicates an error in which a user has submitted a malformed ISBN.
 * @param {string} message The error message.
 * @param {string} stack   The stack trace.
 */
function ISBNError(message, stack) {
	this.name = 'ISBNError';
	this.message = message || 'ISBN Invalid.';
	this.stack = stack;
}
ISBNError.prototype = new Error();
ISBNError.prototype.constructor = ISBNError;


module.exports = {

	InvalidArgumentException: InvalidArgumentException,
	FailedToPersistDataException: FailedToPersistDataException,
	ISBNError: ISBNError

};