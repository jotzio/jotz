var Jotz = require('./jotz');
window.jotz = Jotz.loadOrCreate('app');
jotz.initialize();
jotz.startMainWindow();
