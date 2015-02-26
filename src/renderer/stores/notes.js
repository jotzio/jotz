var ipc = require('ipc');
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');
var Note = require('./note');
var NotebooksStore = require('./notebooks');


var Notes = Backbone.Collection.extend({
  model: Note,

  comparator: 'createdAt',

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
    this.fetchNotes();
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
    this.currentNote = this.add(payload.content, { merge: true });
    ipc.send('save-note', this.currentNote);
    NotebooksStore.saveNotebook(note);
  },

  fetchNotes: function() {
    ipc.send('fetch-notes');
  },

  destroyNote: function(payload) {
    var _id = payload.content.get('_id');
    this.remove(payload.content);
    ipc.send('destroy-note', _id);
  },

  makeGist: function(payload) {
    this.currentNote = this.add(payload.content.note, { merge: true });
    ipc.send('make-gist', payload.content);
  },

  handleCheckForSaveReply: function(saveStatus, note) {
    if (saveStatus && note) {
      this.add(note, { merge: true });
      ipc.send('save-note', note);
    } else {
      this.fetchNotes();
    }
  },

  handleSaveNoteReply: function(err, note) {
    if (err) {
      // TODO: ask guys how we want to handle error
      this.fetchNotes();
    } else {
      this.currentNote.set(note.attributes);
      this.fetchNotes();
      console.log('note saved successfully');
    }
  },

  handleFetchNotesReply: function(notes) {
    this.reset(notes);
  },

  handleDestroyNoteReply: function(err) {
    if (err) {
      // TODO: display note-deletion failure message to user
      console.log('note deletion unsuccessful -- no note with that Id');
    } else {
      // display 'note deleted!' to user and change views
      console.log('note deleted successfully');
      this.fetchNotes();
    }
  },

  handleMakeGistReply: function(updatedNoteAttributes) {
    if (!updatedNoteAttributes) {
      this.fetchNotes();
      // TODO: error handling display to user
    } else {
      this.currentNote.set(updatedNoteAttributes);
      this.fetchNotes();
      console.log('gist published successfully!');
      // TODO: remove 'create gist' button
      // TODO: add 'update gist' button and logic
      // TODO: add 'copy gist url to share' button and logic
    }
  }
});

var NotesStore = new Notes();

module.exports = NotesStore;
