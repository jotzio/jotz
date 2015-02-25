var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');
var _ = require('underscore');
var Backbone = require('backbone');
var AuthAPI = require('./auth_api');


var GistBrowser = Backbone.Model.extend({
  initialize: function(options) {
    this.set('jotzBrowser', options.jotzBrowser);
    this.bindMtds();
  },
  bindMtds: function() {
    _.bindAll(this, 'makeGist', 'publishGist', 'authSwitch');
  },
  makeGist: function(noteBlock) {
    AuthAPI.ghAuthenticated(this.authSwitch.bind(this, noteBlock));
  },
  publishGist: function(noteBlock, githubId, ghAccessToken) {
    // pub gist via jotz-services
  },
  authSwitch: function(noteBlock, githubId, ghAccessToken) {
    if (ghAccessToken) {
      this.publishGist(noteBlock, githubId, ghAccessToken);
    } else {
      this.get('jotzBrowser').set('noteBlock', noteBlock);
      this.get('jotzBrowser').get('oAuthWindow').runGhOAuth();
    }
  }
});


module.exports = GistBrowser;
