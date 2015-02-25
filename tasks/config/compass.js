module.exports = function(grunt) {

  grunt.config.set('compass', {
    dev: {                    // Another target
      options: {
        importPath: ['assets/bower_components/materialize/sass'],
        sassDir: 'assets/styles/',
        cssDir: '.tmp/public/styles',
        environment: 'development'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

};