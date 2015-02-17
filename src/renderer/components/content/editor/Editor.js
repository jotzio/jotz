var React = require('react');
var AceEditor = require('./aceEditor');

var BlockMenu = React.createClass({
  render: function(){
    return (
      <select defaultValue="javascript" onChange={this.props.changeLanguage}>
        <option value="javascript">JavaScript</option>
        <option value="coffee">CoffeeScript</option>
        <option value="clojure">Clojure</option>
        <option value="css">CSS</option>
      </select>
    );
  }
});

var NoteBlock = React.createClass({
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockNum);
  },
  render: function () {
    return (
      <div>
        <BlockMenu changeLanguage={this.changeLanguage} />
        <div id={'ace-editor' + this.props.blockNum} className='ace-editor-inner'></div>
      </div>
    )
  }
});

var Editor = React.createClass({
  render: function() {
    var noteBlocks = this.props.noteBlocks.map(function (block, index) {
      return (
        <NoteBlock blockNum={index} />
      );
    });
    return (
      <div className='ace-editor-container'>
        {noteBlocks}
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