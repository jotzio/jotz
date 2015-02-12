var JotzDispatcher = require('../dispatcher/JotzDispatcher');

var actionCreator = {
  makeNote: function(content, otherVariables){
    JotzDispatcher.handleMakeNote({
      type: 'make-note',
      text: content,
      other: otherVariables
    });
  }
};

module.exports = actionCreator;