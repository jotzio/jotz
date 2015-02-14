var React = require('react');
var Ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var EditorView = React.createClass({
  componentDidMount: function() {
    var editor = Ace.edit('ace-editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setOptions({
      maxLines: 400,
      minLines: 5
    });
    editor.setTheme('ace/theme/monokai');
  },
  render: function() {
    return (
      <div className='ace-editor-container'>
        <div id='ace-editor' className='ace-editor-inner'></div>
      </div>
    );
  }
});

module.exports = EditorView;