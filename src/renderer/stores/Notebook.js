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
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'new-note':
        // TODO: display creation/editing view
        break;
      case 'create-note':
        // add note to notebookstore
        var note = this.set(this.prepareNoteData(payload), { remove: false });
        // write note to file system
        this.saveNote(note);
        break;
      default:
        break;
    }
  },

  prepareNoteData: function(payload) {
    var noteData = {
      _id: payload.content._id,
      title: payload.content.title,
      blocks: payload.content.blocks,
      notebookTitle: payload.content.notebookTitle,
      notebookId: payload.content.notebookId
    };
    if (!noteData._id) {
      noteData._id = utils.getIndexBelowMaxForKey(noteData.title);
    }
    return noteData;
  },

  saveNote: function(note) {
    ipc.send('save-note', note);
  },

  handleSaveNoteReply: function(err) {
    if (err) {
      // TODO: ask guys how we want to handle error
      // pull it out of collection and add error message to user?
    } else {
      // display 'note saved!' message to user
    }
  }
});

var NotebookStore = new Notebook();

module.exports = NotebookStore;
