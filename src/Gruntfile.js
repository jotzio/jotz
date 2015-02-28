var fs = require('fs');
var path = require('path');
var _ = require('underscore');

// TODO: Add Windows/Linux path support
var buildAppPath = '../atom_shell/Jotz.app/Contents/Resources/app';

module.exports = function(grunt) {
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.21.2',
      outputDir: '../atom_shell',
      downloadDir: '../atom_cache',
      rebuild: true
    },

    'build-atom-shell': {
      tag: 'v0.21.2',
      nodeVersion: '0.16.0',
      buildDir: '../build',
      targetDir: '../atom_shell',
      projectName: 'jotz',
      productName: 'Jotz'
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
      },
      fonts: {
        src: 'fonts/**',
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
  grunt.loadNpmTasks('grunt-build-atom-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('compile:dev', 'rebuild contextify lib', function(n) {
    var walk = require('walk');

    var options = {
      listeners: {
        files: function(root, stat, next) {
          var cFile = _.findWhere(stat, {name:'binding.gyp'});
          var cDir = _.last(root.split('/'));

          if (cFile && cDir === 'contextify') {

            grunt.config.set('shell', {
              nodeBuildDev: {
                command: 'node-gyp clean configure build',
                options: {
                  failOnError: true,
                  stdout: true,
                  stderr: true,
                  execOptions: {
                    cwd: root
                  }
                }
              }
            });

            grunt.task.run(['shell:nodeBuildDev']);
          }
          next();
        },
        names: function(root, stats, next) {
          next();
        },
        errors: function(root, stats, next) {
          next();
        }
      }
    };

    var walker = walk.walkSync('node_modules', options);

    grunt.log.writeln('done');
  });

  grunt.registerTask('compile:prod', 'rebuild contextify lib', function(n) {
    var walk = require('walk');

    var options = {
      listeners: {
        files: function(root, stat, next) {
          var cFile = _.findWhere(stat, {name:'binding.gyp'});
          var cDir = _.last(root.split('/'));

          if (cFile && cDir === 'contextify') {

            grunt.config.set('shell', {
              nodeBuildProd: {
              command: 'node-gyp clean configure build',
                options: {
                failOnError: true,
                  stdout: true,
                  stderr: true,
                  execOptions: {
                  cwd: path.join(buildAppPath, root)
                }
              }
            }
            });

            grunt.task.run(['shell:nodeBuildProd']);
          }
          next();
        },
        names: function(root, stats, next) {
          next();
        },
        errors: function(root, stats, next) {
          next();
        }
      }
    };

    var walker = walk.walkSync(path.join(buildAppPath, 'node_modules'), options);

    grunt.log.writeln('done');
  });

  grunt.config.set('shell', {
    install: {
      command: 'apm install . --production',
      options: {
        failOnError: true,
        stdout: true,
        stderr: true,
        execOptions: {
          cwd: buildAppPath
        }
      }
    },
    boot: {
      command: '../atom_shell/Jotz.app/Contents/MacOS/Jotz',
      options: {
        failOnError: true,
        stdout: true,
        stderr: true,
        execOptions: {
          cwd: './'
        }
      }
    }
  });

  grunt.registerTask('build', 'build the app', function(n) {
    var flag = grunt.option('scratch');

    if (flag) {
      grunt.task.run(['build-atom-shell', 'copy', 'shell:install', 'compile:dev', 'compile:prod', 'sass']);
    } else {
      grunt.task.run(['copy','sass']);
    }
  });

  grunt.registerTask('boot', ['shell:boot']);

  grunt.registerTask('default', ['build', 'watch']);
};
