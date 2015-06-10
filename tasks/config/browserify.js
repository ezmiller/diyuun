/**
 * Compile front-end modules, transforms .jsx code to .js on the fly,
 * and then output all as as bundle to .tmp/public/js/main.js
 *
 * // TODO: Setup jQuery and underscore as externals in browserify.
 *
 */

var externals = [
  'react',
  'react/addons',
  'jquery',
  'backbone',
  'react-router'
];

module.exports = function(grunt) {

  grunt.config.set('browserify', {
    main: {
      src: 'assets/js/main.jsx',
      dest: '.tmp/public/js/main.js',
      options: {
        debug: true,
        extensions: ['.jsx'],
        external: externals,
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
        external: externals,
        transform: [
          ['babelify', {'stage': 0}]
        ]
      }
    },
    login: {
      src: 'assets/js/login.jsx',
      dest: '.tmp/public/js/login.js',
      options: {
        debug: true,
        insertGlobals: true,
        extensions: ['.jsx'],
        external: externals,
        transform: [
          ['babelify', {'stage': 0}]
        ]
      }
    },
    vendor: {
      src: [
        './node_modules/react/dist/react-with-addons.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/backbone/backbone.js',
      ],
      dest: '.tmp/public/js/dependencies/vendor.js',
      options: {
        debug: false,
        alias: {
          'react': './node_modules/react/dist/react-with-addons.js',
          'react/addons': './node_modules/react/dist/react-with-addons.js',
          'jquery': './node_modules/jquery/dist/jquery.js',
          'backbone': './node_modules/backbone/backbone.js',
          'react-router': './node_modules/react-router/lib/index.js'
        },
        shim: {
          react_router: {
            path: './node_modules/react-router/lib/index.js',
            exports: 'react-router'
          }
        },
        external: null
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};