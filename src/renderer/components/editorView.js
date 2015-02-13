var React = require('react');
var Ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var EditorView = React.createClass({
  componentDidMount: function() {
    var editor = Ace.edit('editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');
  },
  render: function() {
    return (
      <div id='editor'></div>
    );
  }
});

module.exports = EditorView;