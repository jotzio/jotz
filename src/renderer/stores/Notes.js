var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');


var Notes = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    ipc.on('save-note-reply', this.handleSaveNoteReply.bind(this));
    ipc.on('destroy-note-reply', this.handleDestroyNoteReply.bind(this));
    ipc.on('fetch-notes-reply', this.handleFetchNotesReply.bind(this));
    ipc.on('save-note-reply', this.handleSaveNotebookReply.bind(this));
    ipc.on('fetch-notes-reply', this.handleFetchNotebooksReply.bind(this));
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'new-note':
        // TODO: display creation/editing view
        break;
      case 'save-note':
        this.saveNote(payload);
        break;
      case 'fetch-notes':
        this.fetchNotes();
        break;
      case 'destroy-note':
        this.destroyNote(payload);
        break;
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

  saveNote: function(payload) {
    var note = this.set(this.prepareNoteData(payload), { remove: false });
    ipc.send('save-note', note);
  },

  fetchNotes: function() {
    ipc.send('fetch-notes');
  },

  destroyNote: function(payload) {
    ipc.send('destroy-note', payload.content._id);
  },

  saveNotebook: function(payload) {

  },

  fetchNotebooks: function() {

  },

  prepareNoteData: function(payload) {
    var noteData = {
      _id: payload.content._id,
      title: payload.content.title,
      blocks: payload.content.blocks,
      notebook: {
        notebookTitle: payload.content.notebook.notebookTitle,
        notebookId: payload.content.notebook.notebookId
      }
    };
    return noteData;
  },

  handleSaveNoteReply: function(err) {
    if (err) {
      // TODO: ask guys how we want to handle error
      // pull it out of collection and add error message to user?
    } else {
      // display 'note saved!' message to user
      console.log('note saved successfully');
    }
  },

  handleFetchNotesReply: function(notes) {
    this.set(notes);
  },

  handleDestroyNoteReply: function(err) {
    if (err) {
      // TODO: display note-deletion failure message to user
      console.log('note deletion unsuccessful -- no note with that Id');
    } else {
      // display 'note deleted!' to user and change views
      console.log('note deleted successfully');
    }
  },

  handleSaveNotebookReply: function(err) {

  },

  handleFetchNotebooksReply: function(notebooks) {

  }
});

var NotesStore = new Notes();

module.exports = NotesStore;
