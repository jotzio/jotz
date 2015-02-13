var fs = require('fs');
var path = require('path');

// TODO: Add Windows/Linux path support
var buildAppPath = '../atom_shell/Atom.app/Contents/Resources/app';

module.exports = function(grunt) {
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.21.2',
      outputDir: '../atom_shell'
    },

    pkg: grunt.file.readJSON('package.json'),

    env: {
      build: {
        NODE_ENV: 'production'
      }
    },

    copy: {
      browser: {
        src: 'browser/**',
        dest: buildAppPath + '/'
      },
      renderer: {
        src: 'renderer/**',
        dest: buildAppPath + '/'
      },
      html: {
        src: 'index.html',
        dest: path.join(buildAppPath, 'index.html')
      },
      pkg: {
        src: 'package.json',
        dest: path.join(buildAppPath, 'package.json')
      },
      boot: {
        src: 'boot.js',
        dest: path.join(buildAppPath, 'boot.js')
      },
      assets: {
        src: 'assets/**',
        dest: buildAppPath + '/'
      },
      menus: {
        src: 'menus/**',
        dest: buildAppPath + '/'
      }
    },

    sass: {
      dist: {
        options: {

        },
        files: [
          {
            expand: true,
            cwd: 'styles',
            src: ['style.scss'],
            dest: buildAppPath,
            ext: '.css'
          }
        ]
      }
    },

    watch: {
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass']
      },
      copy: {
        files: ['browser/**', 'renderer/**', 'index.html', 'package.json', 'boot.js', 'assets/**', 'menus/**'],
        tasks: ['copy']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-download-atom-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('install', 'install application dependencies', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('npm install && apm install .', {cwd: buildAppPath}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });

  grunt.registerTask('build', 'build the app', function(n) {
    var flag = grunt.option('scratch');

    if (flag) {
      grunt.task.run(['download-atom-shell', 'copy', 'install', 'sass'])
    } else {
      grunt.task.run(['copy','sass']);
    }
  });

  grunt.registerTask('boot', 'boot up the atom app', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('../atom_shell/Atom.app/Contents/MacOS/Atom', {cwd: './'}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });

  grunt.registerTask('default', ['build', 'watch']);
};
