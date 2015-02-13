var Backbone = require('backbone');
var _ = require('underscore');
var ipc = require('ipc');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');

var Notebook = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
  },

  dispatchCallback: function(payload) {
    switch(payload.action.type) {
      case 'make-note':
        this.saveNote(new Note(payload.action.content));
        break;
      default:
        break;
    }
  },

  saveNote: function(note) {
    // optimistic collection save on client?
    // fire off event with ipc
    // listen for ipc event on browser
    // write to fs on broswer
    // fire off completion event with ipc
    // listen for completion event on client (here or in react component?)
    console.log(note);
  }
});

module.exports = Notebook;
