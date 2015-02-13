var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');


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
    // setup process.env
    // init all app modules
    // set new modules as props on this model
    this.set('mainWindow', null);
    this.setConfigs();
    this.bindMtds();
    app.on('ready', this.startMainWindow);
  },
  startMainWindow: function() {
    // Boot app after setup is complete
    this.set('mainWindow', new BrowserWindow({
      width: this.get('config').w,
      height: this.get('config').h,
      show: false
    }));
    // Load index of the app, which boots renderer processess and
    // initializes all mainWindow React components
    this.get('mainWindow').loadUrl(this.get('config').index);
    // Setup app lifecycle event handler
    this.handleEvents();
    // Display window after all app-level event handlers are registered
    this.get('mainWindow').show();
  },
  handleEvents: function() {
    // Listen for browser window close
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
    // Listen for save-note-message on ipc
    ipc.on('save-note-message', function(e, arg) {
      console.log(arg + ' caught on browser');
      // Send reply back to renderer on ipc
      e.sender.send('save-note-reply', 'created yo');
    });
  },
  removeWindow: function(windowName) {
    // Dereference the window object
    this.set(windowName, null);
  }
});

module.exports = JotzBrowser;
