var app = require('app');
var fs = require('fs');

var GlobalUtils = (function() {

  var api = {
    getAppDirPath: function() {
      return app.getDataPath();
    },
    getAppDirFilenames: function() {
      fs.readdir(api.getAppDirPath(), function(err, filenames) {
        return err ? err : filenames;
      });
    },
    getAppConfigPath: function() {
      return api.getAppDirPath() + '/jotz_app_config.json';
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
    getAppConfigData: function(cb) {
      fs.readFile(api.getAppConfigPath(), 'utf8', function(err, fileData) {
        err ? cb(err) : cb(null, fileData);
      });
    },
    getUserConfigPath: function() {
      return api.getAppDirPath() + '/jotz_user_config.json';
    }
  };

  return api;
})();


module.exports = GlobalUtils;
