var JotzDispatcher = require('../dispatcher/JotzDispatcher.js');

//Example action called in noteView.js, line 5
var actionCreator = {
  createNote: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'create-note',
      content: content
    });
  },
  newNote: function() {
    JotzDispatcher.dispatch({
      actionType: 'new-note',
    });
  }
};

module.exports = actionCreator;
