var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');
var Note = require('./note');
var NotebooksStore = require('./notebooks');


var Notes = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    _.bindAll(this,
      'dispatchCallback',
      'handleSaveNoteReply',
      'handleDestroyNoteReply',
      'handleFetchNotesReply',
      'handleCheckForSaveReply',
      'handleMakeGistReply'
    );
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
    ipc.on('save-note-reply', this.handleSaveNoteReply);
    ipc.on('destroy-note-reply', this.handleDestroyNoteReply);
    ipc.on('fetch-notes-reply', this.handleFetchNotesReply);
    ipc.on('check-for-save-reply', this.handleCheckForSaveReply);
    ipc.on('make-gist-reply', this.handleMakeGistReply);
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
      case 'check-for-save':
        this.checkForSave(payload);
        break;
      case 'make-gist':
        this.makeGist(payload);
        break;
      default:
        break;
    }
  },

  checkForSave: function(payload) {
    if (payload.content.changed) {
      ipc.send('check-for-save', payload.content.note);
    } else {
      console.log('model is the same');
    }
  },

  saveNote: function(payload) {
    var note = this.add(payload.content, { merge: true });
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

  handleCheckForSaveReply: function(saveStatus, note) {
    if (saveStatus && note) {
      this.add(note, { merge: true });
      ipc.send('save-note', note);
    } else {
      this.fetchNotes();
    }
  },

  handleSaveNoteReply: function(err) {
    if (err) {
      // TODO: ask guys how we want to handle error
      // pull it out of collection and add error message to user?
    } else {
      // display 'note saved!' message to user
      console.log('note saved successfully');
      this.fetchNotes();
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
