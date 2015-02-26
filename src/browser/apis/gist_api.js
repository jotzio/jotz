var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');
var _ = require('underscore');
var Backbone = require('backbone');


var GistBrowser = Backbone.Model.extend({
  initialize: function(options) {
    this.set('jotzBrowser', options.jotzBrowser);
    this.bindMtds();
  },
  bindMtds: function() {
    _.bindAll(this, 'makeGist', 'publishGist', 'authSwitch');
  },
  makeGist: function(noteBlock) {
    this.get('jotzBrowser').get('oAuthBrowser').ghAuthenticated(this.authSwitch.bind(this, noteBlock));
  },
  publishGist: function(noteBlock, authData) {
    // TODO: publish gist via jotz-services
    console.log(noteBlock, authData);
  },
  authSwitch: function(noteBlock, authData) {
    if (authData) {
      this.publishGist(noteBlock, authData);
    } else {
      this.get('jotzBrowser').set('noteBlock', noteBlock);
      this.get('jotzBrowser').get('oAuthBrowser').runGhOAuth();
    }
  }
});


module.exports = GistBrowser;
