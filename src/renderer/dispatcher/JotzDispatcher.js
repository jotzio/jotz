var Dispatcher = require('flux').Dispatcher;

var JotzDispatcher = new Dispatcher();

 JotzDispatcher.handleMakeNote = function(action){
    var payload = {
      action: action
    };
    console.log('dispatching!');
    this.dispatch(payload);
  };

module.exports = JotzDispatcher;

