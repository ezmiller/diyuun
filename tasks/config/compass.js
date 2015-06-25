module.exports = function(grunt) {

  grunt.config.set('compass', {
    dev: {                    // Another target
      options: {
        sassDir: 'assets/styles/',
        cssDir: '.tmp/public/styles',
        importPath: './assets/bower_components',
        environment: 'development'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

};