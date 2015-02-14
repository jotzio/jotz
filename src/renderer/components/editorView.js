var React = require('react');
var Ace = require('brace');
require('./aceConfig');
require('brace/theme/monokai');


var EditorView = React.createClass({
  changeLanguage: function (event) {
    console.log(event.target.value);
    this.editor.session.setMode('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = Ace.edit('ace-editor');
    this.editor.getSession().setMode('ace/mode/javascript');
    this.editor.setOptions({
      maxLines: 400,
      minLines: 5
    });
    this.editor.setTheme('ace/theme/monokai');
  },
  render: function() {
    return (
      <div className='ace-editor-container'>
        <div id='ace-editor' className='ace-editor-inner'></div>
        <select onChange={this.changeLanguage}>
          <option value="javascript" selected>JavaScript</option>
          <option value="coffeescript">CoffeeScript</option>
        </select>
      </div>
    );
  }
});

module.exports = EditorView;