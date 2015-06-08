/**
 * Compile front-end modules, transforms .jsx code to .js on the fly,
 * and then output all as as bundle to .tmp/public/js/main.js
 *
 * // TODO: Setup jQuery and underscore as externals in browserify.
 *
 */

var externals = [
  'react',
  'jquery',
  'backbone',
  'react-cursor',
  'react-router'
];

module.exports = function(grunt) {

  grunt.config.set('browserify', {
    main: {
      src: 'assets/js/main.jsx',
      dest: '.tmp/public/js/main.js',
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
    signup: {
      src: 'assets/js/signup.jsx',
      dest: '.tmp/public/js/signup.js',
      options: {
        debug: true,
        insertGlobals: true,
        extensions: ['.jsx'],
        externals: externals,
        transform: [
          ['babelify', {'stage': 0}]
        ]
      }
    },
    vendor: {
      src: [
        'node_modules/react/dist/react-with-addons',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/backbone.js',
        'node_modules/src/react-cursor.js',
      ],
      dest: '.tmp/public/js/dependencies/vendor.js',
      options: {
        debug: false,
        detectGlobals: false,
        noParse: [
          'jquery'
        ],
        alias: [
          'react:',
          'jquery:',
          'backbone:',
          'react-cursor:',
          'react-router:'
        ],
        shim: {
          react_router: {
            path: 'node_modules/react-router/lib/index.js',
            exports: 'react-router'
          }
        },
        external: null
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};