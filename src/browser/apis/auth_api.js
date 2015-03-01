var fs = require('fs');
var request = require('request');
var jsf = require('jsonfile');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var clipboard = require('clipboard');
var _ = require('underscore');
var Backbone = require('backbone');
var utils = require('../utils/global');
var authWindowConfigs = require('../config/auth_window');

var AuthAPI = (function() {
  var OAuthBrowser = Backbone.Model.extend({
    initialize: function(options) {
      this.setInitialState(options);
      this.bindMtds();
      this.registerEvents();
    },
    setInitialState: function(options) {
      this.set('jotzBrowser', options.jotzBrowser);
      this.set('configs', authWindowConfigs);
      this.setAuthConfigs();
    },
    setAuthConfigs: function() {
      this.set('authEndpoint', 'https://jotz-services.herokuapp.com/api/auth/ghlogin');
      this.set('oAuthWindow', null);
      this.set('oAuthWindow', new BrowserWindow(this.get('configs')));
    },
    bindMtds: function() {
      _.bindAll(this,
        'registerEvents',
        'display',
        'runGhOAuth',
        'triggerOAuthSave'
      );
    },
    registerEvents: function() {
      ipc.on('body-scraped', this.triggerOAuthSave);
    },
    display: function() {
      this.get('oAuthWindow').loadUrl(this.get('authEndpoint'));
      this.get('oAuthWindow').show();
    },
    runGhOAuth: function() {
      this.display();
    },
    triggerOAuthSave: function(e, body) {
      this.get('oAuthWindow').hide();
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
  return {
    oAuthBrowser: OAuthBrowser
  };
})();

module.exports = AuthAPI;
