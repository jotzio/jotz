var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');
var Notebook = require('./notebook');
var actionCreator = require('../actions/action_creator');

var Notebooks = Backbone.Collection.extend({
  model: Notebook,

  initialize: function() {
    _.bindAll(this,
      'dispatchCallback',
      'handleSaveNotebookReply',
      'handleFetchNotebooksReply',
      'handleDestroyNotebookReply',
      'handleCheckDeleteNotesReply'
    );
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
    ipc.on('save-notebook-reply', this.handleSaveNotebookReply);
    ipc.on('fetch-notebooks-reply', this.handleFetchNotebooksReply);
    ipc.on('destroy-notebook-reply', this.handleDestroyNotebookReply);
    ipc.on('check-delete-nb-reply', this.handleCheckDeleteNotesReply);
    this.fetchNotebooks();
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'save-notebook':
        this.saveNotebook(payload.content);
        break;
      case 'fetch-notebooks':
        this.fetchNotebooks();
        break;
      case 'check-delete-notebook':
        this.checkDeleteNotes(payload.id);
        break;
      default:
        break;
    }
  },

  saveNotebook: function(notebook) {
    var noteData = this.prepareNotebookData(notebook);
    ipc.send('save-notebook', noteData);
  },

  fetchNotebooks: function() {
    ipc.send('fetch-notebooks');
  },

  checkDeleteNotes: function(id) {
    ipc.send('check-delete-nb-notes', id);
  },

  destroyNotebook: function(id) {
    this.remove(this.findWhere({ _id: id }));
    ipc.send('destroy-notebook', id);
  },

  handleSaveNotebookReply: function(err) {
    if (err) {
      // TODO: ask guys how we want to handle error
      // pull it out of collection and add error message to user?
    } else {
      // display 'notebook saved!' message to user
      console.log('notebook saved successfully');
      this.fetchNotebooks();
    }
  },

  handleFetchNotebooksReply: function(notebooks) {
    this.set(notebooks);
  },

  handleCheckDeleteNotesReply: function(deleteStatus, id) {
    this.destroyNotebook(id);
    if (deleteStatus) {
      console.log('deleting notes');
      actionCreator.destroyNotesById(id);
    }
  },

  handleDestroyNotebookReply: function() {
    console.log('notebook destroyed');
  },

  prepareNotebookData: function(notebook) {
    var notebookData = {
      title: notebook.title,
      _id: notebook._id
    };
    return notebookData;
  }
});

var NotebooksStore = new Notebooks();

module.exports = NotebooksStore;
