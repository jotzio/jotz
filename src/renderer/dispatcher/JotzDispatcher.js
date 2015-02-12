var Dispatcher = require('Flux').Dispatcher;

var JotzDispatcher = new Dispatcher({
  handleMakeNote = function(action){
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = JotzDispatcher;

