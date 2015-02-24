module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            options: {
                style: 'expanded',
                loadPath: ['node_modules/material-ui-sass']
            },
            files: [
                {
                    expand: true,
                    cwd: 'assets/styles/',
                    src: ['*.scss', '*.sass'],
                    dest: '.tmp/public/styles/',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'assets/vendor/',
                    src: ['**/*.scss', '**/*.sass'],
                    dest: '.tmp/public/vendor/',
                    ext: '.css'
                }
            ]
        }
    });

    grunt.loadTasks('node_modules/grunt-contrib-sass/tasks');
};