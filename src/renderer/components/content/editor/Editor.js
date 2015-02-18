var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/actionCreator');
var NoteBlock = require('./NoteBlock');

var Editor = React.createClass({
  newBlock: function() {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $set: this.state.note.blocks.concat([''])
        }
      }
    });
    this.setState(newState);
  },

  updateBlock: function(index, value) {
    var note = _.clone(this.state.note);
    note.blocks[index] = value;
    this.setState({note: note});
  },

  saveNote: function() {
    console.log(this.state.note.blocks);
    actionCreator.saveNote(this.state.note);
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