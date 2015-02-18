var React = require('react/addons');
var AceEditor = require('./aceEditor');
var _ = require('underscore');

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
  saveNote: function() {
    console.log(this.state.blocks);
  },
  updateBlock: function(index, value) {
    var blocks = _.clone(this.state.blocks);
    blocks[index] = value;
    this.setState({blocks: blocks});
  },
  newBlock: function() {
    console.log(this.state.blocks);
    this.setState({blocks: this.state.blocks.concat([''])});
  },
  getInitialState: function() {
    return {
      title: this.props.note.title,
      blocks: this.props.note.blocks
    }
  },
  render: function() {
    var save = this.handleSave;
    var noteBlocks = this.state.blocks.map(function (block, index) {
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
        <h3>{this.state.title}</h3>
        <button onClick={this.newBlock}>NEW BLOCK</button>
        {noteBlocks}
        <button onClick={this.saveNote}>SAVE</button>
      </div>
    );
  }
});

module.exports = Editor;