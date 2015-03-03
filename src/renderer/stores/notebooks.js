var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');
var Notebook = require('./notebook');


var Notebooks = Backbone.Collection.extend({
  model: Notebook,

  initialize: function() {
    _.bindAll(this,
      'dispatchCallback',
      'handleSaveNotebookReply',
      'handleFetchNotebooksReply',
      'handleDestroyNotebookReply'
    );
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
    ipc.on('save-notebook-reply', this.handleSaveNotebookReply);
    ipc.on('fetch-notebooks-reply', this.handleFetchNotebooksReply);
    ipc.on('destroy-notebook-reply', this.handleDestroyNotebookReply);
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
      case 'destroy-notebook':
        this.destroyNotebook(payload.id);
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

  destroyNotebook: function(id) {
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

  handleDestroyNotebookReply: function(notebooks) {
    console.log('notebook destroyed');
    this.set(notebooks)
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
