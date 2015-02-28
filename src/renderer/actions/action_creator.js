var JotzDispatcher = require('../dispatcher/jotz_dispatcher.js');

var actionCreator = {
  saveNote: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'save-note',
      content: content
    });
  },
  destroyNote: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'destroy-note',
      content: content
    });
  },
  fetchNotes: function() {
    JotzDispatcher.dispatch({
      actionType: 'fetch-notes'
    });
  },
  checkForSave: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'check-for-save',
      content: content
    });
  },
  createNote: function() {
    JotzDispatcher.dispatch({
      actionType: 'create-note'
    });
  },
  saveNotebook: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'save-notebook',
      content: content
    });
  },
  fetchNotebooks: function() {
    JotzDispatcher.dispatch({
      actionType: 'fetch-notebooks'
    });
  },
  makeGist: function(content) {
    JotzDispatcher.dispatch({
      actionType: 'make-gist',
      content: content
    });
  }
};

module.exports = actionCreator;
