/**
 * BookConstants
 */

// define([], function() {

	// TODO: Make this keyMirror globallly available! 
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	var BookConstants = keyMirror({
		BOOK_CREATE: null
	});

	module.exports = BookConstants;

	// return BookConstants;

// }); // define