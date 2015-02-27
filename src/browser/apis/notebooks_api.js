var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var utils = require('../utils/global');
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
    }
  };

})();

module.exports = NotebooksAPI;

