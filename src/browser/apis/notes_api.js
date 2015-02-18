var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var utils = require('../utils/global');

var NotesAPI = (function() {

  // Private API
  var api = {
    findNote: function(filename, cb) {
      utils.getNotesDirData(function(noteFilenames) {
        noteFilenames.indexOf(filename) >= 0 ? cb(true) : cb(false);
      });
    },
    noteFilename: function(noteId) {
      return noteId + '.json';
    },
    writeNote: function(filename, noteData, cb) {
      var filePath = utils.getNotesDirPath() + filename;
      fs.writeFile(filePath, JSON.stringify(noteData), { encoding: 'utf8' }, cb);
    },
    getNotesData: function(filenames, cb) {
      var notes = [], c = 0;
      filenames.forEach(function(filename) {
        c++;
        var filepath = utils.getNotesDirPath() + filename;
        api.getNoteData(notes, filepath, cb, c);
      });
    },
    getNoteData: function(notes, filepath, cb, c) {
      fs.readFile(filepath, { encoding: 'utf8' }, function(err, note) {
        notes.push(note);
        if (0 === --c) cb(notes);
      });
    },
    destroyNoteData: function(filename, cb) {
      var filepath = utils.getNotesDirPath() + filename;
      fs.unlink(filepath, cb);
    }
  };

  // Public API
  return {
    saveNote: function(note, cb) {
      var filename = api.noteFilename(note.attributes._id);
      api.findNote(filename, function() {
          api.writeNote(filename, note.attributes, cb);
      });
    },
    destroyNote: function(noteId, cb) {
      var filename = api.noteFilename(noteId);
      api.destroyNoteData(filename, cb);
    },
    fetchNotes: function(cb) {
      utils.getNotesDirData(function(filenames) {
        api.getNotesData(filenames, cb);
      });
    }
  };

})();

module.exports = NotesAPI;

