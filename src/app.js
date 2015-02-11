var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

var config = {
  w: 800,
  h: 600,
  index: 'file://' + __dirname + '/index.html'
};

function quitApp() {
  if (process.platform != 'darwin') app.quit();
}

// Quit when all windows are closed
app.on('window-all-closed', quitApp);

// Boot app after setup is complete
app.on('ready', function() {
  // Create the browser window
  mainWindow = new BrowserWindow({ width: config.w, height: config.h });
  // Load index of the app
  mainWindow.loadUrl(config.index);
  // Listen for browser window close
  mainWindow.on('closed', function() {
    // Dereference the window object
    mainWindow = null;
  });
});
