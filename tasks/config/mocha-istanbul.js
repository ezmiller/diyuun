/**
 * // TODO: Add description of mocha-istanbult task here.
 *
 */
module.exports = function(grunt) {

  grunt.config.set('mocha_istanbul', {
    coverage: {
      src: 'test', // folder holding tests, not the test files.
      options: {
        coverageFolder: 'coverage',
        mask: '**/*.spec.js',
        root: 'api/',
        timeout: 5000
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
};