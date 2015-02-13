 var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('Note');

var Notebook = Backbone.collection.extend({
  model: Note,

  initialize: function(){
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback);
  },

  //not sure if switch is best practice, just saw it in a few examples
  dispatchCallback: function(payload){
    switch(payload) {
      case 'make-note':
        //do something to collection
        break;
      default:
        break;
    }
  }
});

module.exports = Notebook;
