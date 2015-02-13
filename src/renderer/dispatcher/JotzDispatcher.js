var Dispatcher = require('flux').Dispatcher;

var JotzDispatcher = new Dispatcher();

 JotzDispatcher.handleMakeNote = function(action) {
    var payload = {
      action: action
    };
    console.log('dispatching ' + action.type);
    this.dispatch(payload);
  };

module.exports = JotzDispatcher;

