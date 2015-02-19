var Backbone = require('backbone');
var remote = require('remote');
var path = require('path');
var utils = remote.require(path.join(__dirname, '../../browser/utils/global.js'));

var Note = Backbone.Model.extend({

  defaults: {
    _id: utils.createGuid(),
    title: 'Test title',
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