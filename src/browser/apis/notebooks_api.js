var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var utils = require('../utils/global');
var dialog = require('dialog');
var NotesAPI = require('./notes_api');

var NotebooksAPI = (function() {

  // Private API
  var api = {
    getNotebooks: function(cb) {
      utils.getNotebooksFileData(cb);
    },
    writeNotebook: function(filePath, notebooks, notebookData, cb) {
      notebooks.push(notebookData);
      jsf.writeFile(filePath, notebooks, cb);
    },
    contains: function(notebooks, notebook) {
      for (var i = 0; i < notebooks.length; i++) {
        if (notebooks[i]._id === notebook._id) return true;
      }
      return false;
    },
    createOrUpdateNotebook: function(notebooks, notebook, cb) {
      utils.getNotebooksFileData(function(notebooks) {
        if (api.contains(notebooks, notebook)) {
          cb(null);
        } else {
          api.writeNotebook(utils.getNotebooksPath(), notebooks, notebook, cb);
        }
      });
    },
    destroyNotebook: function(notebooks, id, cb) {
      utils.getNotebooksFileData(function(notebooks) {
        for (var i = 0; i < notebooks.length; i++) {
          if (notebooks[i]._id === id) {
            notebooks.splice(i, 1);
            jsf.writeFile(utils.getNotebooksPath(), notebooks, cb);
            break;
          }
        }
      });
    },
    deletePrompt: function() {
      return {
        type: 'info',
        buttons: ['Keep Notes', 'Delete Notes'],
        message: 'Would you like to delete all Notes in this notebook?'
      };
    }
  };

  // Public API
  return {
    saveNotebook: function(notebook, cb) {
      notebook._id = utils.createGuid();
      api.getNotebooks(function(notebooks) {
        api.createOrUpdateNotebook(notebooks, notebook, cb);
      });
    },
    fetchNotebooks: function(cb) {
      api.getNotebooks(cb);
    },
    destroyNotebook: function(id, cb) {
      api.getNotebooks(function(notebooks) {
        api.destroyNotebook(notebooks, id, cb);
      });
    },
    shouldDeleteNotes: function(cb) {
      var result = dialog.showMessageBox(api.deletePrompt());
      cb(result);
    }
  };

})();

module.exports = NotebooksAPI;

