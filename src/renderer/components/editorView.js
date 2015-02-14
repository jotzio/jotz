var React = require('react');
var Ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var EditorView = React.createClass({
  componentDidMount: function() {
    var editor = Ace.edit('ace-editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');
  },
  render: function() {
    var style = {
      height: '50vh',
      width: '50vw',
      backgroundColor: 'black'
    };
    return (
      <div id='ace-editor' className='ace-editor-container'></div>
    );
  }
});

module.exports = EditorView;