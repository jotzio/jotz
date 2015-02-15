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
    // ipc.on('save-note-reply', function(arg) { console.log(arg + ' caught reply on renderer'); });
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'new-note':
        // TODO: display creation/editing view
        break;
      case 'create-note':
        // add note to notebook store
        var note = this.add({ content: payload.content });
        this.saveNote(note);
        break;
      default:
        break;
    }
  },

  saveNote: function(note) {
    console.log(note);
    // fire off event with ipc
    ipc.send('save-note-message', note);
    // listen for ipc event on browser
    // write to fs on broswer
    // fire off completion event with ipc from browser
    // collection save on client
    // update react component on collection 'change' event (automatically)
  }
});

var NotebookStore = new Notebook();

module.exports = NotebookStore;
