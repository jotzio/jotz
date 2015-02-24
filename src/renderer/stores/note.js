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
      case 'update-title':
        this.updateTitle(payload);
      case 'delete-block':
        this.deleteBlock(payload);
        break;
      default:
        break;
    }
  },

  updateTitle: function(payload) {
    this.set('title', payload.content);
  },

  createBlock: function() {
    var blocks = this.get('blocks');
    blocks.push({
      language: 'text',
      content: ''
    });
    console.log(blocks);
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
    console.log(blocks);
    this.set('blocks', blocks);
    this.trigger('block-updated');
  },
  
  deleteBlock: function(payload) {
    var blocks = this.get('blocks');
    console.log(blocks);
    blocks.splice(payload.index, 1);
    console.log(blocks);
    this.set('blocks', blocks);
    this.trigger('block-updated');
  }
});

module.exports = Note;

