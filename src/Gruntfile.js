module.exports = function(grunt) {
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.20.3',
      outputDir: '../atom_shell'
    },

    react: {
      single_file_output: {
        files: {
          '../build/components/sideMenu.js': 'renderer/components/sideMenu.jsx'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-download-atom-shell');
  grunt.loadNpmTasks('grunt-react');
};
