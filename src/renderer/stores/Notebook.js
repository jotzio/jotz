var ipc = require('ipc');
var remote = require('remote');
var path = require('path');
var utils = remote.require(path.join(__dirname, '../../browser/utils/global.js'));
var _ = require('underscore');
var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');


var Notebook = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    ipc.on('save-note-reply', this.handleSaveNoteReply.bind(this));
    ipc.on('fetch-notes-reply', this.handleFetchNotesReply.bind(this));
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
      default:
        break;
    }
  },

  saveNote: function(payload) {
    var note = this.set(this.prepareNoteData(payload), { remove: false });
    if (!note.get('_id')) note.set('_id', utils.createGuid());
    ipc.send('save-note', note);
  },

  fetchNotes: function() {
    ipc.send('fetch-notes');
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

  handleFetchNotesReply: function(JSONnotes) {
    this.set(JSON.parse(JSONnotes));
  }
});

var NotebookStore = new Notebook();

module.exports = NotebookStore;
