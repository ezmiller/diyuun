module.exports = function(grunt) {

  grunt.config.set('compass', {
    dev: {                    // Another target
      options: {
        importPath: ['node_modules/material-ui-sass'],
        sassDir: 'assets/styles/',
        cssDir: '.tmp/public/styles',
        environment: 'development'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

};