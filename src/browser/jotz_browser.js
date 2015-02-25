var app = require('app');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var NotesAPI = require('./apis/notes_api');
var NotebooksAPI = require('./apis/notebooks_api');
var AuthAPI = require('./apis/auth_api');
var GistBrowser = require('./apis/gist_api');
var OAuthWindow = AuthAPI.oAuthWindow;
var mainWindowConfigs = require('./config/main_window');


var JotzBrowser = Backbone.Model.extend({
  setupReporters: function() {
    require('crash-reporter').start();
  },
  setConfigs: function() {
    this.set('mainWindowConfigs', mainWindowConfigs);
  },
  bindMtds: function() {
    _.bindAll(this,
      'setupReporters',
      'setConfigs',
      'startMainWindow',
      'registerEvents',
      'removeWindow',
      'shouldSave',
      'sendCheckSaveReply',
      'makeGist',
      'handleOAuthCompletion',
      'publishGist'
    );
  },
  initialize: function() {
    this.setupReporters();
    this.set('mainWindow', null);
    this.setConfigs();
    this.bindMtds();
    app.on('ready', this.startMainWindow);
  },
  startMainWindow: function() {
    this.set('mainWindow', new BrowserWindow(this.get('mainWindowConfigs')));
    this.set('oAuthWindow', new OAuthWindow({ jotzBrowser: this }));
    this.set('gistBrowser', new GistBrowser({ jotzBrowser: this }));
    this.get('mainWindow').loadUrl(this.get('mainWindowConfigs').index);
    this.registerEvents();
    this.get('mainWindow').show();
  },
  registerEvents: function() {
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
    this.get('oAuthWindow').on('oauth-window-closed', this.handleOAuthCompletion);
    this.on('gh-authenticated', this.publishGist);
    ipc.on('save-note', this.saveNote);
    ipc.on('fetch-notes', this.fetchNotes);
    ipc.on('destroy-note', this.destroyNote);
    ipc.on('save-notebook', this.saveNotebook);
    ipc.on('fetch-notebooks', this.fetchNotebooks);
    ipc.on('check-for-save', this.shouldSave);
    ipc.on('make-gist', this.makeGist);
  },
  removeWindow: function(windowName) {
    this.set(windowName, null);
  },
  saveNote: function(e, note) {
    NotesAPI.saveNote(note, function(result) {
      e.sender.send('save-note-reply', result);
    });
  },
  fetchNotes: function(e) {
    NotesAPI.fetchNotes(function(notes) {
      e.sender.send('fetch-notes-reply', notes);
    });
  },
  destroyNote: function(e, noteId) {
    NotesAPI.destroyNote(noteId, function(err) {
      e.sender.send('destroy-note-reply', err);
    });
  },
  saveNotebook: function(e, notebook) {
    NotebooksAPI.saveNotebook(notebook, function(err) {
      e.sender.send('save-notebook-reply', err);
    });
  },
  fetchNotebooks: function(e) {
    NotebooksAPI.fetchNotebooks(function(notebooks) {
      e.sender.send('fetch-notebooks-reply', notebooks);
    });
  },
  shouldSave: function(e, note) {
    NotesAPI.shouldSave(function(result) {
      this.sendCheckSaveReply(result, e, note);
    }.bind(this));
  },
  sendCheckSaveReply: function(result, e, note) {
    if (result === 1) {
      e.sender.send('check-for-save-reply', false, null);
    } else {
      e.sender.send('check-for-save-reply', true, note);
    }
  },
  makeGist: function(e, noteBlock) {
    this.get('gistBrowser').makeGist(noteBlock);
  },
  handleOAuthCompletion: function() {
    // TODO: 1. app side user_data.json
    // TODO: 2. jotz-services api

    // 1. fetch githubId and accessToken -> request.get('/api/auth/userdata');
    // 2. write response githubId and accessToken to user_data.json

    // User is authed and stuff stored in DB
    // Show loading display progress to user ('saving your settings')


    // write response gh id and access token to user_data.json
    // set gh id and access token on this model
    //this.set('githubId', githubId);
    //this.set('ghAccesstoken', ghAccessToken);
    // trigger event, listen and publish gist
    //this.trigger('gh-authenticated');
  },
  publishGist: function(e) {
    //var noteBlock = this.get('noteBlock');
    //var githubId = this.get('githubId');
    //var accessToken = this.get('ghAccessToken');
    //this.get('gistBrowser').publishGist(noteBlock, githubId, accessToken);
  }
});

module.exports = JotzBrowser;
