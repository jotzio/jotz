var JotzDispatcher = require('../dispatcher/JotzDispatcher.js');

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
  },
  fetchNotes: function() {
    JotzDispatcher.dispatch({
      actionType: 'fetch-notes'
    });
  }
};

module.exports = actionCreator;
