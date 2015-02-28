var app = require('app');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var NotesAPI = require('./apis/notes_api');
var NotebooksAPI = require('./apis/notebooks_api');
var GistBrowser = require('./apis/gist_api');
var OAuthBrowser = require('./apis/auth_api').oAuthBrowser;
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
      'publishGist',
      'handleGistUpdateOfNote'
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
    this.set('oAuthBrowser', new OAuthBrowser({ jotzBrowser: this }));
    this.set('gistBrowser', new GistBrowser({ jotzBrowser: this }));
    this.get('mainWindow').loadUrl(this.get('mainWindowConfigs').index);
    this.registerEvents();
    this.get('mainWindow').show();
  },
  registerEvents: function() {
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
    this.get('oAuthBrowser').on('oauth-window-closed', this.handleOAuthCompletion);
    this.get('gistBrowser').on('note-updated-by-gist', this.handleGistUpdateOfNote);
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
    NotesAPI.saveNote(note, function(result, note) {
      e.sender.send('save-note-reply', result, note);
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
  makeGist: function(e, payload) {
    this.get('gistBrowser').makeGist(payload);
  },
  handleOAuthCompletion: function(body) {
    // TODO 1. Show loading display progress to user ('saving your settings')
    var data = JSON.parse(body);
    var id = data.githubId;
    var token = data.ghAccessToken;
    this.set('githubId', id);
    this.set('ghAccessToken', token);
    this.get('oAuthBrowser').storeData(data);
    this.trigger('gh-authenticated', data);
    // TODO 3. hide loading progress display
    // TODO 3. show gist publication progress display
  },
  publishGist: function(authData) {
    this.get('gistBrowser').publishGist(this.get('noteBlock'), authData);
  }
});

module.exports = JotzBrowser;
