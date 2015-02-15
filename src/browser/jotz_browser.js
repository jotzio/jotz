var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var NotesAPI = require('./apis/notes_api');


var JotzBrowser = Backbone.Model.extend({
  setupReporters: function() {
    require('crash-reporter').start();
  },
  setConfigs: function() {
    this.set('config', {
      w: 800,
      h: 600,
      index: path.join('file://', __dirname, '../index.html')
    });
  },
  bindMtds: function() {
    _.bindAll(this,
        'setupReporters',
        'setConfigs',
        'startMainWindow',
        'handleEvents',
        'removeWindow'
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
      show: false
    }));
    this.get('mainWindow').loadUrl(this.get('config').index);
    this.handleEvents();
    this.get('mainWindow').show();
  },
  handleEvents: function() {
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
    ipc.on('save-note', function(e, note) {
      NotesAPI.saveNote(note, function(err, savedNote) {
        // if err, send back error
        // if err is null, send back note
        // e.sender.send('save-note-reply', SOMETHING);
      });
    });
  },
  removeWindow: function(windowName) {
    this.set(windowName, null);
  }
});

module.exports = JotzBrowser;
