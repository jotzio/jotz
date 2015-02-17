var app = require('app');
var fs = require('fs');

var GlobalUtils = (function() {

  // Private
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

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
    createGuid: function() {
      return guid();
    }
  };

  return api;
})();


module.exports = GlobalUtils;
