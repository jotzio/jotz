var JotzDispatcher = require('../dispatcher/JotzDispatcher.js');

var actionCreator = {
  saveNote: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'save-note',
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
