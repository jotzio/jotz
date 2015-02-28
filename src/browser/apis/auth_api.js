var fs = require('fs');
var request = require('request');
var jsf = require('jsonfile');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var _ = require('underscore');
var Backbone = require('backbone');
var utils = require('../utils/global');
var bodyScraper = require('../utils/body_scraper');


var AuthAPI = (function() {
  var wConfig = {
    show: false,
    "zoom-factor": 0.9,
    center: true,
    "always-on-top": true,
    title: "Log in to Jotz with your GitHub Account"
  };

  var OAuthBrowser = Backbone.Model.extend({
    initialize: function(options) {
      this.set('jotzBrowser', options.jotzBrowser);
      this.set('configs', wConfig);
      this.set('authEndpoint', 'https://jotz-services.herokuapp.com/api/auth/ghlogin');
      this.set('oAuthCount', 0);
      this.bindMtds();
      this.set('oAuthWindow', null);
      this.set('oAuthWindow', new BrowserWindow(this.get('configs')));
      this.registerEvents();
    },
    bindMtds: function() {
      _.bindAll(this,
        'registerEvents',
        'display',
        'runGhOAuth',
        'incrementOAuthCount',
        'handleOAuthCompletion',
        'triggerOAuthSave'
      );
    },
    registerEvents: function() {
      this.get('oAuthWindow').webContents.on('did-get-redirect-request', this.incrementOAuthCount);
      this.get('oAuthWindow').webContents.on('did-finish-load', this.handleOAuthCompletion);
      ipc.on('body-scraped', this.triggerOAuthSave);
    },
    display: function() {
      this.get('oAuthWindow').loadUrl(this.get('authEndpoint'));
      this.get('oAuthWindow').show();
    },
    runGhOAuth: function() {
      this.display();
    },
    incrementOAuthCount: function() {
      this.set('oAuthCount', this.get('oAuthCount') + 1);
    },
    handleOAuthCompletion: function() {
      if (this.get('oAuthCount') === 2) {
        this.get('oAuthWindow').hide();
        this.set('oAuthCount', 0);
        this.get('oAuthWindow').webContents.executeJavaScript(bodyScraper.code);
      }
    },
    triggerOAuthSave: function(e, body) {
      this.trigger('oauth-window-closed', body);
    },
    ghAuthenticated: function(cb) {
      utils.getAuthData(function(authData) {
        if (authData.githubId && authData.ghAccessToken) {
          cb(authData);
        } else {
          cb(false);
        }
      });
    },
    storeData: function(data) {
      utils.writeAuthData(data);
    }
  });

  // Auth Public API
  return { oAuthBrowser: OAuthBrowser };

})();

module.exports = AuthAPI;
