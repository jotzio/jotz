var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');

var NotesAPI = (function() {

  // Private API
  var api = {
    findNote: function(filename, cb) {
      utils.getNotesDirData(function(noteFilenames) {
        if (noteFilenames.indexOf(filename) >= 0) {
          cb(true);
        } else {
          cb(false);
        }
      });
    },
    noteFilename: function(noteId) {
      return noteId + '.json';
    },
    writeNote: function(filename, noteData, cb) {
      var filePath = utils.getNotesDirPath() + filename;
      jsf.writeFile(filePath, noteData, cb);
    },
    getNotesData: function(filenames, cb) {
      var notes = [], c = filenames.length;
      filenames.forEach(function(filename) {
        c--;
        var filepath = utils.getNotesDirPath() + filename;
        api.getNoteData(notes, filepath, cb, c);
      });
    },
    getNoteData: function(notes, filepath, cb, c) {
      jsf.readFile(filepath, function(err, note) {
        if (note) {
          notes.push(note);
          if (c === 0) {
            cb(notes);
          }
        }
      });
    },
    destroyNoteData: function(filename, cb) {
      var filepath = utils.getNotesDirPath() + filename;
      fs.unlink(filepath, cb);
    },
    savePrompt: function() {
      return {
        type: 'info',
        buttons: ['Save Changes', 'Discard Changes'],
        message: 'Would you like to save your recent changes before closing this note?'
      };
    }
  };

  // Public API
  return {
    saveNote: function(note, cb) {
      note.attributes._id = note.attributes._id || utils.createGuid();
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
    },
    shouldSave: function(cb) {
      var result = dialog.showMessageBox(api.savePrompt());
      cb(result);
    }
  };

})();

module.exports = NotesAPI;

