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
  }

});

module.exports = Note;
