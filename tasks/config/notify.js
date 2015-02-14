/**
 * Notify when grunt tasks complete
 */
module.exports = function(grunt) {

	grunt.config.set('notify_hooks', {
		options: {
	      enabled: true,
	      max_jshint_notifications: 5, // maximum number of notifications from jshint output
	      title: "Kanon", // defaults to the name in package.json, or will use project directory's name
	      success: true, // whether successful grunt executions should be notified automatically
	      duration: 1 // the duration of notification in seconds, for `notify-send only
	    },
	});

	grunt.config.set('notify', {
		server: {
	    	options: {
	    		title: "Kanon",
	    		message: "Server is ready!",
	    		duration: 1
	    	}
	    }
	});

	grunt.loadNpmTasks('grunt-notify');
};