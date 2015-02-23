var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');
var AuthAPI = require('./auth_api');

var GistAPI = (function() {

  // Private API
  var api = {

  };

  // Public API
  return {
    makeGist: function(noteBlock, cb) {
      //AuthAPI.authenticate();
      //console.log(noteBlock);
    }
  };

})();

module.exports = GistAPI;
