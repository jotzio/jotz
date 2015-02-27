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
      'handleFetchNotebooksReply'
    );
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
    ipc.on('save-notebook-reply', this.handleSaveNotebookReply);
    ipc.on('fetch-notebooks-reply', this.handleFetchNotebooksReply);
    this.fetchNotebooks();
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'save-notebook':
        this.saveNotebook(payload);
        break;
      case 'fetch-notebooks':
        this.fetchNotebooks();
        break;
      default:
        break;
    }
  },

  saveNotebook: function(note) {
    var noteData = this.prepareNotebookData(note);
    ipc.send('save-notebook', noteData);
  },

  fetchNotebooks: function() {
    ipc.send('fetch-notebooks');
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
    this.reset(notebooks);
  },

  prepareNotebookData: function(note) {
    var notebookData = {
      title: note.content,
      _id: null
    };
    return notebookData;
  }
});

var NotebooksStore = new Notebooks();

module.exports = NotebooksStore;
