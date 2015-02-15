var React = require('react');
var Editor = require('./aceEditor');
require('brace/mode/javascript');
require('brace/mode/coffee');

var EditorMenu = React.createClass({

});

var Editor = React.createClass({
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = new Editor();
  },
  render: function() {
    return (
      <div className='ace-editor-container'>
        <div id='ace-editor' className='ace-editor-inner'></div>
        <select defaultValue="javascript" onChange={this.changeLanguage}>
          <option value="javascript">JavaScript</option>
          <option value="coffee">CoffeeScript</option>
          <option value="clojure">Clojure</option>
          <option value="css">CSS</option>
        </select>
      </div>
    );
  }
});

module.exports = Editor;