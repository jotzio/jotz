var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('./Note');

var Notebook = Backbone.Collection.extend({
  model: Note,

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
  },

  dispatchCallback: function(payload) {
    switch(payload.action.type) {
      case 'make-note':
         // Example of accessing props on the payload.action
        for (var key in payload.action) {
          console.log(payload.action[key]);
        }
        break;
      default:
        break;
    }
  }
});

module.exports = Notebook;
