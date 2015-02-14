//Sets up React var globally
var React = require('react');

require('node-jsx').install();

var NoteStore = require('./stores/Note');
var NotebookStore = require('./stores/Notebook');
var viewRenderer = require('./components/viewRenderer');

module.exports = {
  init: function() {
    viewRenderer.render({notebookStore: NotebookStore});
  }
};
