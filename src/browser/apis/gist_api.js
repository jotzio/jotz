var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');
var _ = require('underscore');
var Backbone = require('backbone');
var request = require('request');


var GistBrowser = Backbone.Model.extend({
  initialize: function(options) {
    this.set('jotzBrowser', options.jotzBrowser);
    this.bindMtds();
  },
  bindMtds: function() {
    _.bindAll(this, 'makeGist', 'publishGist', 'authSwitch');
  },
  gistConfigs: function(content) {
    return {
      method: 'POST',
      json: true,
      url: 'http://localhost:8000/api/gists/publish',
      body: content
    };
  },
  makeGist: function(noteBlock) {
    this.get('jotzBrowser').get('oAuthBrowser').ghAuthenticated(this.authSwitch.bind(this, noteBlock));
  },
  publishGist: function(noteBlock, authData) {
    var content = {
      githubId: authData.githubId,
      ghAccessToken: authData.ghAccessToken,
      noteBlock: noteBlock
    };
    request(this.gistConfigs(content), function(err, res, body) {
      // TODO: handle gist publication response
    });
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
