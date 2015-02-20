var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');
var Notebook = require('./notebook');


var Notebooks = Backbone.Collection.extend({
  model: Notebook,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    ipc.on('save-notebook-reply', this.handleSaveNotebookReply.bind(this));
    ipc.on('fetch-notebooks-reply', this.handleFetchNotebooksReply.bind(this));
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
    this.set(noteData, { remove: false });
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
    }
  },

  handleFetchNotebooksReply: function(notebooks) {
    this.set(notebooks);
  },

  prepareNotebookData: function(note) {
    var notebookData = {
      title: note.get('notebook').title,
      _id: note.get('notebook')._id
    };
    return notebookData;
  }
});

var NotebooksStore = new Notebooks();

module.exports = NotebooksStore;
