var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');
var NotebooksStore = require('./Notebooks');


var Notes = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    ipc.on('save-note-reply', this.handleSaveNoteReply.bind(this));
    ipc.on('destroy-note-reply', this.handleDestroyNoteReply.bind(this));
    ipc.on('fetch-notes-reply', this.handleFetchNotesReply.bind(this));
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'save-note':
        this.saveNote(payload);
        break;
      case 'fetch-notes':
        this.fetchNotes();
        break;
      case 'destroy-note':
        this.destroyNote(payload);
        break;
      default:
        break;
    }
  },

  saveNote: function(payload) {
    var note = this.set(payload.content, { remove: false });
    ipc.send('save-note', note);
    // TODO: Add this back in after moving NoteBook to a Backbone Model
    //NotebooksStore.saveNotebook(note);
  },

  fetchNotes: function() {
    ipc.send('fetch-notes');
  },

  destroyNote: function(payload) {
    ipc.send('destroy-note', payload.content._id);
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
  }
});

var NotesStore = new Notes();

module.exports = NotesStore;
