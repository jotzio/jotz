var React = require('react');
var Editor = require('./aceEditor');
require('brace/mode/javascript');
require('brace/mode/coffee');

//var AceSettings = React.createClass({
//
//});


//var EditorMenu = React.createClass({
//  render: function () {
//    return (
//      <div>
//        <ul>
//          <AceSettings />
//          <li>New Block</li>
//        </ul>
//      </div>
//    );
//  }
//});

var Editor = React.createClass({
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  //selectText: function () {
  //  this.editor.selectTextBlock('ace-editor1');
  //},
  //saveTextBox: function () {
  //  this.editor.saveTextBlock();
  //},
  componentDidMount: function() {
    console.log('hello');
    this.editor = new Editor();
  },
  render: function() {
    return (
      <div className='ace-editor-container'>
        <div id='ace-editor' className='ace-editor-inner'></div>
      </div>
    );
  }
});

module.exports = Editor;

        //<select defaultValue="javascript" onChange={this.changeLanguage}>
        //  <option value="javascript">JavaScript</option>
        //  <option value="coffee">CoffeeScript</option>
        //  <option value="clojure">Clojure</option>
        //  <option value="css">CSS</option>
        //</select>
//TODO:
/*
append <div id='ace(int)' className = 'ace-editor-inner' onClick={this.editor.select}></div>
this.editor.select -> ('ace(int)')
on clicking another/new text block, previous block appends text to div
on save, do ^ and save ace-editor-container to new doc
on open note, pass note as props to be initiated with ace-editor-container

<div id='container'>
  <div id='textblock1'>some js</div>
  <div id='textblock2'>some rtf</div>
</div>

on file open/save
  map textblock divs to array in json object

{
  noteBlocks: [
    'javascript:/unique-separator/:some js'
    'rtf:/unique-separator/:some rtf'
  ]
}

 */