var JotzDispatcher = require('../dispatcher/JotzDispatcher');
var Note = require('Note');

var Notebook = Backbone.collection.extend({
  model: Note,

  initialize: function(){
    this.dispatchToekn = JotzDispatcher.register(this.dispatchCallback);
  },

  //not sure if switch is best practice, just saw it in a few examples
  dispatchCallback: function(payload){
    switch(payload){
      case 'make-notebook':
        //do something to collection
        break;
      default:
        break;
    }
  }
});

module.exports = Notebook;
