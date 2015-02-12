var JotzDispatcher = require('../dispatcher/JotzDispatcher.js');

//Example action called in noteView.js, line 5
var actionCreator = {
  makeNote: function(content){
    JotzDispatcher.handleMakeNote({
      type: 'make-note',
      content: content
    });
  }
};

module.exports = actionCreator;