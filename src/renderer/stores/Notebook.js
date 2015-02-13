var Backbone = require('backbone');
var _ = require('underscore');
var ipc = require('ipc');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');

var Notebook = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
    // listen for ipc completion event on client
    ipc.on('save-note-reply', function(arg) { console.log(arg + ' caught reply on renderer'); });
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

    // fire off event with ipc
    ipc.send('save-note-message', note);
    // listen for ipc event on browser
    // write to fs on broswer
    // fire off completion event with ipc from browser
    // collection save on client
    // update react component on collection 'change' event (automatically)
  }
});

module.exports = Notebook;
