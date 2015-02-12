
var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.20.3',
      outputDir: '../atom_shell'
    },

    // pkg: grunt.file.readJSON('package.json'),

    env: {
      build: {
        NODE_ENV: 'production'
      }
    },

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          '../build/build.js': 'renderer/components/**/*.jsx'
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          '../build/build.js': 'renderer/main.js'
        }
      }
    },

    watch: {
      browserify: {
        files: ['renderer/**/*.jsx'],
        tasks: ['browserify:dev']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-download-atom-shell');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['env:build', 'browserify:build']);

};
