module.exports = function(grunt) {
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.20.3',
      outputDir: '../atom_shell'
    }
  });
  grunt.loadNpmTasks('grunt-download-atom-shell');
};
