var React = require('react');
var AceEditor = require('./aceEditor');

//TODO: refactor into separate file, add all languages
var NoteBlockMenu = React.createClass({
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
  getNote: function() {
    this.editor.getText();
  },
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockNum);
    this.editor.setText(this.props.text);
  },
  render: function () {
    return (
      <div>
        <NoteBlockMenu changeLanguage={this.changeLanguage} />
        <div
          id={'ace-editor' + this.props.blockNum}
          className='ace-editor-inner'
        ></div>
      </div>
    )
  }
});

var Editor = React.createClass({
  //saveNote: function() {
  //  React.Children.forEach(this.state.blocks, function(block) {
  //    block =
  //  })
  //},
  newBlock: function() {
    console.log(this.state.blocks);
    this.setState({blocks: this.state.blocks.concat(['hello'])});
  },
  getInitialState: function() {
    return {
      title: this.props.note.title,
      blocks: this.props.note.blocks
    }
  },
  render: function() {
    var noteBlocks = this.state.blocks.map(function (block, index) {
      return (
        <NoteBlock blockNum={index} text={block} ref={'ae'+index} />
      );
    });
    return (
      <div className='ace-editor-container'>
        <h3>{this.state.title}</h3>
        <button onClick={this.newBlock}>NEW BLOCK</button>
        {noteBlocks}
        <button onClick={this.saveNote}>SAVE</button>
      </div>
    );
  }
});

module.exports = Editor;

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