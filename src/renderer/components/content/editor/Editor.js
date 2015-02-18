var React = require('react/addons');
var AceEditor = require('./aceEditor');
var _ = require('underscore');
var BlockMenu = require('./BlockMenu');
var actionCreator = require('../../../actions/actionCreator');

var NoteBlock = React.createClass({
  updateNote: function() {
    console.log(this.props.value);
    this.props.value = this.editor.getText();
    this.props.updateBlock(this.props.blockNum, this.props.value);
  },
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockNum);
    this.editor.setText(this.props.value);
    this.editor.onChange(this.updateNote);
  },
  render: function () {
    return (
      <div>
        <BlockMenu changeLanguage={this.changeLanguage} />
        <div
          id={'ace-editor' + this.props.blockNum}
          className='ace-editor-inner'
        ></div>
      </div>
    )
  }
});

var Editor = React.createClass({
  newBlock: function() {
    console.log(this.state.note.blocks);
    this.setState({blocks: this.state.note.blocks.concat([''])});
  },
  updateBlock: function(index, value) {
    var note = _.clone(this.state.note);
    note.blocks[index] = value;
    this.setState({note: note});
  },
  saveNote: function() {
    console.log(this.state.note.blocks);
    actionCreator.saveNote(newNote);
  },
  getInitialState: function() {
    return {
      note: this.props.note
    }
  },
  render: function() {
    var save = this.handleSave;
    var noteBlocks = this.state.note.blocks.map(function (block, index) {
      return (
        <NoteBlock
          value={block}
          blockNum={index}
          updateBlock={this.updateBlock}
        />
      );
    }.bind(this));
    return (
      <div className='ace-editor-container'>
        <h3>{this.state.note.title}</h3>
        <button onClick={this.newBlock}>NEW BLOCK</button>
        {noteBlocks}
        <button onClick={this.saveNote}>SAVE</button>
      </div>
    );
  }
});

module.exports = Editor;