/**
 * CustomErrors.js
 * @module CustomErrors
 *
 * Description: Provides custom errors. The errors are specified in 
 *    the errors[] array. When an error is a top-level error it is declared
 *    in that array as a string. When it has a parent the declaration 
 *    involves an array specifying the error name and its parent, e.g.
 *    [<errorname>, <parent errorname>].
 *
 *    The errors then can be created in the project like so
 *        var sample = CustomErrors.createSampleError('<message>')
 *    And you can test whether an error is of a certain category like so:
 *        sample.isAnSampleError; // will return true
 *
 *   //TODO: Simplify the implementation of errors!
 */
'use strict';

var errors = [
    'InvalidArgument',
    ['MissingId', 'InvalidArgument'],
    'RecordNotFound',
    'Persistence',
    ['FailedToPersist', 'Persistence'],
    'Authorization',
    'Onboarding',
    ['PendingUserNotFound', 'Onboarding'],
    'Recommender'
];

var customError = Object.create( new Error(), {
    parent: {value: null}
});

var createErrorCreator = function(errorName, parentError) {
	var error;

    var createError = function(message) {
        error = Object.create(parentError || customError, {
            name: {value: errorName},
            message: {value: message },
            parent: {value: parentError}
        });
        Error.captureStackTrace(error, createError);
        return error;
    };

    return createError;
}

errors.forEach(function(item) {
    var parentError = null, createParentError,
        s, p, errorName, parentName;

    if ( typeof item !== 'string' ) {
        s = item[0];
        p = item[1];
    } else {
        s = item;
    }

    errorName = s+'Error';

    if ( typeof p !== 'undefined' ) {
        parentName = p+'Error';
        createParentError = module.exports['create' + parentName];
        module.exports['create'+errorName] = createErrorCreator(errorName, createParentError());
    } else {
        module.exports['create'+errorName] = createErrorCreator(errorName, null)
    }


    Object.defineProperty(customError, 'isAn' + errorName, {
        get: function() {
            if ( this.name === errorName ) {
                return true;
            } else if ( this.parent === null ) {
                return false;
            } else {
                return this.parent['isAn' + errorName];
            }
        }
    });
});