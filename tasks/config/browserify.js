/**
 * Compile front-end modules, transforms .jsx code to .js on the fly,
 * and then output all as as bundle to .tmp/public/js/main.js
 *
 * // TODO: Setup jQuery and underscore as externals in browserify.
 *
 */

module.exports = function(grunt) {

  grunt.config.set('browserify', {
    main: {
      src: 'assets/js/main.jsx',
      dest: '.tmp/public/js/main.js',
      options: {
        debug: true,
        extensions: ['.jsx'],
        alias: {
          'jquery': './assets/bower_components/jquery/dist/jquery.min.js'
        },
        transform: [
          ['babelify', {'stage': 0}]
        ]
      }
    },
    signup: {
      src: 'assets/js/signup.jsx',
      dest: '.tmp/public/js/signup.js',
      options: {
        debug: true,
        extensions: ['.jsx'],
        alias: {
          'jquery': './assets/bower_components/jquery/dist/jquery.min.js'
        },
        transform: [
          ['babelify', {'stage': 0}]
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};