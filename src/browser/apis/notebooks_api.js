var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var utils = require('../utils/global');
var NotesAPI = require('./notes_api');

var NotebooksAPI = (function() {

  // Private API
  var api = {

  };

  // Public API
  return {
    saveNotebook: function(notebook, cb) {

    },
    fetchNotebooks: function(cb) {

    }
  };

})();

module.exports = NotebooksAPI;

