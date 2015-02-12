var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');

var Jotz = Backbone.Model.extend({
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
      height: this.get('config').h
    }));
    // Load index of the app
    this.get('mainWindow').loadUrl(this.get('config').index);
    // Init all mainWindow React components
    // FIXME: correct require paths based on future jsx build task
    //this.set('sideMenu', require('../../build/components/sideMenu.js'));
    //this.set('underMenu', require('../../build/components/underMenu.js'));
    //this.set('noteView', require('../../build/components/noteView.js'));
    // Setup event handler
    this.handleEvents();
  },
  handleEvents: function() {
    // Listen for browser window close
    this.get('mainWindow').on('closed', this.removeWindow.bind(this, 'mainWindow'));
  },
  removeWindow: function(windowName) {
    // Dereference the window object
    this.set(windowName, null);
  }
});

module.exports = Jotz;
