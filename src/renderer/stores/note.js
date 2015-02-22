var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');

var Note = Backbone.Model.extend({

  defaults: {
    title: 'Test title',
    blocks: [{
      language: 'text',
      content: ''
    }],
    notebook: {
      notebookTitle: ''
    }
  },

  initialize: function() {
    this.dispatchToken = JotzDispatcher.register(this.dispatchCallback.bind(this));
  },

  dispatchCallback: function(payload) {
    switch(payload.actionType) {
      case 'create-block':
        this.createBlock();
        break;
      case 'update-block':
        this.updateBlock(payload);
        break;
      default:
        break;
    }
  },

  createBlock: function() {
    var blocks = this.get('blocks');
    blocks.push({
      language: 'text',
      content: ''
    });
    debugger;
    this.set('blocks', blocks);
    this.trigger('block-updated');
  },

  updateBlock: function(payload) {
    var i = payload.content.index;
    var blocks = this.get('blocks');
    blocks[i] = {
      language: payload.content.language,
      content: payload.content.content || ''
    };
    this.set('blocks', blocks);
    this.trigger('block-updated');
  }
});

module.exports = Note;

