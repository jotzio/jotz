var fs = require('fs');
var jsf = require('jsonfile');
var ipc = require('ipc');
var dialog = require('dialog');
var utils = require('../utils/global');
var _ = require('underscore');
var Backbone = require('backbone');
var request = require('request');
var NotesAPI = require('./notes_api');


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
      url: 'https://jotz-services.herokuapp.com/api/gists/publish',
      body: content
    };
  },
  makeGist: function(payload) {
    this.get('jotzBrowser').get('oAuthBrowser').ghAuthenticated(this.authSwitch.bind(this, payload));
  },
  publishGist: function(payload, authData) {
    var note = payload.note;
    var block = payload.block;
    var blockIdx = payload.blockIdx;

    var content = {
      githubId: authData.githubId,
      ghAccessToken: authData.ghAccessToken,
      gistId: block.gistId,
      noteBlock: block,
      noteTitle: note.attributes.title
    };

    request(this.gistConfigs(content), function(err, res, body) {
      if (!err) {
        block.gistUrl = body.gistUrl;
        block.gistId = body.gistId;
        note.attributes.blocks[blockIdx] = block;
        NotesAPI.saveNote(note, function(err, updatedNote) {
          if (!err) {
            this.trigger('note-updated-by-gist', updatedNote);
          }
        }.bind(this));
      }
    }.bind(this));
  },
  authSwitch: function(payload, authData) {
    if (authData) {
      this.publishGist(payload, authData);
    } else {
      this.get('jotzBrowser').set('payload', payload);
      this.get('jotzBrowser').get('oAuthBrowser').runGhOAuth();
    }
  }
});


module.exports = GistBrowser;
