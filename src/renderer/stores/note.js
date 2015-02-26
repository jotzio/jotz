var Backbone = require('backbone');
var JotzDispatcher = require('../dispatcher/jotz_dispatcher');

var Note = Backbone.Model.extend({

  defaults: {
    title: 'Untitled',
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
        break;
      case 'delete-block':
        this.deleteBlock(payload);
        break;
      case 'update-notebook':
        this.updateNotebook(payload);
        break;
      default:
        break;
    }
  },

  updateTitle: function(payload) {
    this.set('title', payload.content);
  },

  updateNotebook: function(payload) {
    var notebook = {
      notebookTitle: payload.content
    };
    this.set('notebook', notebook);
    this.trigger('block-updated');
  },

  createBlock: function() {
    var blocks = this.get('blocks');
    blocks.push({
      language: 'text',
      content: ''
    });
    this.set('blocks', blocks);
    this.trigger('block-updated');
  },

  updateBlock: function(payload) {
    var i = payload.content.index;
    var blocks = this.get('blocks');
    blocks[i] = {
      language: payload.content.language,
      content: payload.content.content || '',
      gistId: payload.content.gistId || '',
      gistUrl: payload.content.gistUrl || ''
    };
    this.set('blocks', blocks);
    this.trigger('block-updated');
  },

  deleteBlock: function(payload) {
    var blocks = this.get('blocks');
    blocks.splice(payload.index, 1);
    this.set('blocks', blocks);
    this.trigger('block-updated');
  }
});

module.exports = Note;
