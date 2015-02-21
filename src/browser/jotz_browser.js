var app = require('app');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var NotesAPI = require('./apis/notes_api');
var NotebooksAPI = require('./apis/notebooks_api');

var JotzBrowser = Backbone.Model.extend({
  setupReporters: function() {
    require('crash-reporter').start();
  },
  setConfigs: function() {
    this.set('config', {
      w: 1024,
      h: 768,
      minH: 600,
      minW: 800,
      index: path.join('file://', __dirname, '../index.html')
    });
  },
  bindMtds: function() {
    _.bindAll(this,
      'setupReporters',
      'setConfigs',
      'startMainWindow',
      'handleEvents',
      'removeWindow',
      'shouldSave',
      'sendCheckSaveReply'
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
    this.set('mainWindow', new BrowserWindow({
      width: this.get('config').w,
      height: this.get('config').h,
      'min-height': this.get('config').minH,
      'min-width': this.get('config').minW,
      show: false
    }));
    this.get('mainWindow').loadUrl(this.get('config').index);
    this.handleEvents();
    this.get('mainWindow').show();
  },
  handleEvents: function() {
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
    ipc.on('save-note', this.saveNote);
    ipc.on('fetch-notes', this.fetchNotes);
    ipc.on('destroy-note', this.destroyNote);
    ipc.on('save-notebook', this.saveNotebook);
    ipc.on('fetch-notebooks', this.fetchNotebooks);
    ipc.on('check-for-save', this.shouldSave);
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
  }
});

module.exports = JotzBrowser;
