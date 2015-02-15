var app = require('app');
var fs = require('fs');
var ipc = require('ipc');
var utils = require('../utils/global');

var NotesAPI = (function() {
  return {
    saveNote: function(note, cb) {
      utils.getNotesDirData(function(noteFilenames) {
        // look for filename based on note.title?
        console.log(noteFilenames);
      });
    }
  };
})();

module.exports = NotesAPI;

