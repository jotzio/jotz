var React = require('react');
var NotesStore = require('./stores/notes');
var NotebookStore = require('./stores/notebooks');
var Jotz = require('./components/jotz');

module.exports = {
  init: function() {
    React.render(<Jotz notes={NotesStore} notebooks={NotebookStore}/>, document.body);
  }
};
