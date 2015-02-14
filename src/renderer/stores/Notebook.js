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
    // TODO: integrate with Clark
    // ipc.on('save-note-reply', function(arg) { console.log(arg + ' caught reply on renderer'); });
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'create-note':
        this.add({content: payload.content})
        break;
      case 'new-note':
        this.add({content: 'default note text'})
        break;
      default:
        break;
    }
  },

  // TODO: integrate with Clark
  // saveNote: function(note) {
  //
  //   // fire off event with ipc
  //   ipc.send('save-note-message', note);
  //   // listen for ipc event on browser
  //   // write to fs on broswer
  //   // fire off completion event with ipc from browser
  //   // collection save on client
  //   // update react component on collection 'change' event (automatically)
  // }
});

var NotebookStore = new Notebook();

module.exports = NotebookStore;
