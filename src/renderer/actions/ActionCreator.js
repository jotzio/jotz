var Dispatcher = require('Flux').Dispatcher;

var JotzDispatcher = new Dispatcher();



var actionCreator = {
  makeNote: function(){
    JotzDispatcher.dispatch({
      actionType: 'make-note',
      otherActions: 'something/function/callback'
    })
  }
};

//pseudoclassical would be according to style guide, but i think that^^ will be easier to read
//opinions?
//var actionCreator = {};
//
//actionCreator.prototype.makeNote = function(){
//  JotzDispatcher.dispatch({
//    actionType: 'make-note',
//    otherActions: 'something/function/callback'
//  })
//};

module.exports = actionCreator;