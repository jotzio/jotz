var app = require('app');
var fs = require('fs');

var GlobalUtils = (function() {
  // Private
  var MAX_FOR_HASHING = 1000000;

  // Public
  var api = {
    getAppDirPath: function() {
      return app.getDataPath();
    },
    getNotesDirPath: function() {
      return api.getAppDirPath() + '/notes/';
    },
    createNotesDir: function(cb) {
      fs.mkdir(api.getNotesDirPath(), cb);
    },
    getNotesDirData: function(cb) {
      fs.readdir(api.getNotesDirPath(), function(err, noteFilenames) {
        if (!err) {
          cb(noteFilenames);
        } else {
          api.createNotesDir(function() { cb([]) });
        }
      });
    },
    getIndexBelowMaxForKey: function(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = (hash<<5) + hash + str.charCodeAt(i);
        hash = hash & hash;
        hash = Math.abs(hash);
      }
      return hash % MAX_FOR_HASHING;
    }
  };

  return api;
})();


module.exports = GlobalUtils;
