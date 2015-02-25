var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var _ = require('underscore');
var Backbone = require('backbone');
var utils = require('../utils/global');


var AuthAPI = (function() {
  var wConfig = {
    show: false,
    "zoom-factor": 0.9,
    center: true,
    "always-on-top": true,
    title: "Log in to Jotz with your GitHub Account"
  };

  var OAuthWindow = Backbone.Model.extend({
    initialize: function(options) {
      this.set('jotzBrowser', options.jotzBrowser);
      this.set('configs', wConfig);
      this.set('authEndpoint', 'http://localhost:8000/api/auth/ghlogin/');
      this.set('oAuthCount', 0);
      this.bindMtds();
    },
    bindMtds: function() {
      _.bindAll(this,
        'registerEvents',
        'createWindow',
        'removeWindow',
        'display',
        'runGhOAuth',
        'incrementOAuthCount',
        'handleOAuthCompletion'
      );
    },
    registerEvents: function() {
      var win = this.get('oAuthWindow');
      win.on('closed', this.removeWindow);
      win.webContents.on('did-get-redirect-request', this.incrementOAuthCount);
      win.webContents.on('did-finish-load', this.handleOAuthCompletion);
    },
    createWindow: function() {
      this.set('oAuthWindow', new BrowserWindow(this.get('configs')));
      this.registerEvents();
      return this.get('oAuthWindow');
    },
    removeWindow: function() {
      this.trigger('oauth-window-closed');
      this.set('oAuthWindow', null);
    },
    display: function() {
      var win = this.createWindow();
      win.loadUrl(this.get('authEndpoint'));
      win.show();
    },
    runGhOAuth: function() {
      this.display();
    },
    incrementOAuthCount: function() {
      this.set('oAuthCount', this.get('oAuthCount') + 1);
    },
    handleOAuthCompletion: function() {
      if (this.get('oAuthCount') === 2) {
        this.set('oAuthCount', 0);
        this.get('oAuthWindow').close();
      }
    }
  });

  // Auth Public API
  return {
    oAuthWindow: OAuthWindow,
    ghAuthenticated: function(cb) {
      // check user_data.json for githubId and accessToken
      //if (githubId && accessToken) {
      //  cb(githubId, accessToken);
      //} else {
      //  cb(false);
      //}

      // FOR TESTING GH OAUTH FLOW - REMOVE ME
      cb(false);
    }
  };

})();

module.exports = AuthAPI;
