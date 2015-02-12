var JotzDispatcher = require('../dispatcher/JotzDispatcher');

var actionCreator = {
  makeNote: function(content){
    JotzDispatcher.handleMakeNote({
      type: 'make-note',
      content: content
    });
  }
};

module.exports = actionCreator;