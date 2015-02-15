var app = require('app');
var fs = require('fs');

var GlobalUtils = (function() {

  var api = {
    getAppDirPath: function() {
      return app.getDataPath();
    },
    getNotesDirPath: function() {
      return api.getAppDirPath() + '/notes/';
    },
    getNotesDirData: function(cb) {
      fs.readdir(api.getNotesDirPath(), function(err, noteFilenames) {
        if (err) {
          api.createNotesDir(function() {
            // TODO: how do we want to handle this UX?
            console.log("no notes created yet");
          });
        } else {
          cb(noteFilenames);
        }
      });
    },
    createNotesDir: function(cb) {
      fs.mkdir(api.getNotesDirPath(), cb);
    },
    getAppConfigPath: function() {
      return api.getAppDirPath() + '/jotz_app_config.json';
    },
    getAppConfigData: function(cb) {
      fs.readFile(api.getAppConfigPath(), 'utf8', function(err, fileData) {
        err ? cb(err) : cb(null, fileData);
      });
    },
    createAppConfigFile: function() {
      api.getAppConfigData(function(err, fileData) {
        if (err) {
          // TODO: decide on standard app configuration properties
          var appConfigs = { testConfig: false };
          api.writeAppConfigFile(JSON.stringify(appConfigs));
        } else {
          return fileData;
        }
      });
    },
    writeAppConfigFile: function(configJSON) {
      var opts = { encoding: 'utf8' };
      fs.appendFile(api.getAppConfigPath(), configJSON, opts, function(err) {
        if (err) {
          // TODO: research error handling with Atom Shell
        }
        api.createAppConfigFile();
      });
    },
    getUserConfigPath: function() {
      return api.getAppDirPath() + '/jotz_user_config.json';
    }
  };

  return api;
})();


module.exports = GlobalUtils;
